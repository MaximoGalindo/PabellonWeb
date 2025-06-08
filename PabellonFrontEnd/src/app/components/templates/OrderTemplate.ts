import { Utils } from "src/app/Helpers/Utils";
import { DeliveryOption, Order, PaymentMethod } from "src/app/models/Order";
import { Product } from "src/app/models/Product";

export class OrderTemplate
{
static generateMessage(order: Order): string {
    const formatDate = Utils.formatDate(order.date, 'dd/MM/yyyy - HH:mm');
    const deliveryInfo =
        order.deliveryOption === DeliveryOption.Pickup.toString() || order.deliveryOption == null
            ? ''
            : `*Dirección*: ${order.address}, ${order.moreInfo}\n`;

    // Agrupamos productos con las mismas opciones seleccionadas
    const groupedItems: { name: string, basePrice: number, options: string[], optionsText: string, totalPrice: number, quantity: number }[] = [];

    order.orderDetail.forEach(detail => {
        detail.customizedProducts.forEach(custom => {
            const basePrice = custom.product.price;
            const selectedOptions = custom.selectedOptions || [];

            // Ordenamos opciones para evitar problemas con el orden
            const optionsKey = selectedOptions
                .map(opt => `${opt.name}:${opt.price}`)
                .sort()
                .join('|');

            const optionsText = selectedOptions.map(opt =>
                opt.price > 0
                    ? `   - ${opt.name} | $${opt.price}`
                    : `   - ${opt.name}`
            ).join('\n');

            const totalPrice = basePrice + selectedOptions.reduce((sum, opt) => sum + opt.price, 0);
            const itemKey = `${custom.product.name}::${optionsKey}`;

            const existing = groupedItems.find(item => item.name === custom.product.name && item.optionsText === optionsText);
            if (existing) {
                existing.quantity++;
            } else {
                groupedItems.push({
                    name: custom.product.name.trim(),
                    basePrice,
                    options: selectedOptions.map(o => o.name),
                    optionsText,
                    totalPrice,
                    quantity: 1
                });
            }
        });
    });

    const itemsText = groupedItems.map(item => {
        const priceText = `*${item.name}*: $${item.totalPrice}${item.quantity > 1 ? ` | x${item.quantity}` : ''}`;
        return item.options.length > 0 ? `${priceText}\n${item.optionsText}` : priceText;
    }).join('\n');

    return `_¡Hola! Te paso el resumen de mi pedido_\n\n` +
        `*Fecha*: ${formatDate}\n` +
        `*Nombre*: ${order.name}\n` +
        `*Teléfono*: ${order.phone}\n\n` +
        `*Forma de pago*: ${this.getPaymentMethod(order.paymentMethod)}\n` +
        `*Total*: $ ${order.total}\n` +
        `*Entrega*: ${this.getDeliveryOption(order.deliveryOption)}\n\n` +
        `${order.shippingCost > 0 ? `*Costo de envío*: $ ${order.shippingCost}\n` : ''}` +
        deliveryInfo +
        `Mi pedido es:\n${itemsText}\n\n` +
        `_Espero tu respuesta para confirmar mi pedido_`;
}

    
    static getPaymentMethod(paymentMethod:PaymentMethod | null):string {
        switch(paymentMethod) {
            case PaymentMethod.Cash:
                return 'Efectivo'
            case PaymentMethod.Transfer:
                return 'Transferencia'
            default:
                return 'Error al encontrar metodo de pago'
        }
    }

    static getDeliveryOption(deliveryOption:DeliveryOption | null):string {
        switch(deliveryOption) {
            case DeliveryOption.Delivery:
                return 'Delivery'
            case DeliveryOption.Pickup:
                return 'Retiro en el Local'
            default:
                return 'Error al encontrar metodo de entrega'
        }
    }

    static getOptionsPrice(product: Product): number {
    let total = 0;
    product.options.forEach(option => {
        if (option.isSelected && option.price > 0)
        total += option.price;
    });
    return total;
    }
    
}