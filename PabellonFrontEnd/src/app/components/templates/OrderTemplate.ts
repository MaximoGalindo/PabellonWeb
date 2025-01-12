import { DeliveryOption, Order, PaymentMethod } from "src/app/models/Order";

export class OrderTemplate
{
    static generateMessage(order: Order): string {
        const message = `
            _¡Hola! Te paso el resumen de mi pedido_\n\n*Pedido*: ${order.id}\n*Fecha*: 26/10/24 - 21:26hs\n*Nombre*: ${order.name}\n*Teléfono*: ${order.phone}\n\n*Forma de pago*: ${this.getPaymentMethod(order.paymentMethod)}\n*Total*: $ ${order.total}\n*Entrega*: ${this.getDeliveryOption(order.deliveryOption)}\n\n${
                order.deliveryOption === DeliveryOption.Pickup.toString() || order.deliveryOption == null 
                    ? ''
                    : `*Dirección*: ${order.address}, ${order.moreInfo}\n\n` 
            }\n\nMi pedido es:\n${order.products.map(product => {
                return `*${product.name}*: $${product.price}\n${
                    product.options
                        .filter(option => option.isSelected) // Filtra solo las opciones seleccionadas
                        .map(option => 
                            option.price > 0 
                                ? `   - *${option.name}*: $${option.price}` // Muestra con precio si es mayor a 0
                                : `   - *${option.name}*` // Muestra solo el nombre si el precio es 0
                        )
                        .join('\n') // Une las opciones en líneas separadas
                }`;
            }).join('\n')}\n\n_Espero tu respuesta para confirmar mi pedido_`;
        
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
}