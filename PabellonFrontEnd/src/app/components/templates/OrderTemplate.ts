import { Utils } from "src/app/Helpers/Utils";
import { DeliveryOption, Order, PaymentMethod } from "src/app/models/Order";
import { Product } from "src/app/models/Product";

export class OrderTemplate
{
    static generateMessage(order: Order): string {
        const message = `
            _¡Hola! Te paso el resumen de mi pedido_\n\n*Fecha*: ${Utils.formatDate(order.date, 'dd/MM/yyyy - HH:mm')} \n*Nombre*: ${order.name}\n*Teléfono*: ${order.phone}\n\n*Forma de pago*: ${this.getPaymentMethod(order.paymentMethod)}\n*Total*: $ ${order.total}\n*Entrega*: ${this.getDeliveryOption(order.deliveryOption)}\n\n${
                order.deliveryOption === DeliveryOption.Pickup.toString() || order.deliveryOption == null 
                    ? ''
                    : `*Dirección*: ${order.address}, ${order.moreInfo}\n` 
            }\nMi pedido es:\n${order.orderDetail.map(orderDetail => {
                return `*${orderDetail.product.name}*: $${orderDetail.product.price - this.getOptionsPrice(orderDetail.product)} ${orderDetail.quantity > 1 ? `| x${orderDetail.quantity}` : ''}\n${
                    orderDetail.product.options
                        .filter(option => option.isSelected) // Filtra solo las opciones seleccionadas
                        .map(option => 
                            option.price > 0 
                                ? `   - *${option.name}*: $${option.price}` // Muestra con precio si es mayor a 0
                                : `   - *${option.name}*` // Muestra solo el nombre si el precio es 0
                        )
                        .join('\n') // Une las opciones en líneas separadas
                }`;
            }).join('\n')}\n_Espero tu respuesta para confirmar mi pedido_`;
        
        return message.trim();
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