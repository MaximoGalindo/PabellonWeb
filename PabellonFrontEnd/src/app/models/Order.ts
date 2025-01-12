import { Product } from "./Product"

export class Order {
    id: number = 0
    orderNumber: string = ''
    address: string = ''
    moreInfo: string = ''
    name: string = ''
    phone: string = ''
    date: Date = new Date()
    total: number = 0
    deliveryOption: DeliveryOption | null = null
    paymentMethod: PaymentMethod | null = null
    products: Product[] = []
}

export enum DeliveryOption {
    Delivery = 'Delivery',
    Pickup = 'Pickup'
}

export enum PaymentMethod {
    Cash = 'Cash',
    Transfer = 'Transfer'
}
