import { CustomizedProduct } from "./Product"

export class Order {
    id: number = 0
    orderNumber: string = ''
    address: string = ''
    moreInfo: string = ''
    name: string = ''
    phone: string = ''
    date: Date = new Date()
    total: number = 0
    shippingCost: number = 0
    deliveryOption: DeliveryOption | null = null
    paymentMethod: PaymentMethod | null = null
    orderDetail: OrderDetail[] = []
}

export class OrderDetail {
    customizedProducts: CustomizedProduct[] = [];
    productName: string = '';
    totalDetail: number = 0;
    getTotalPrice(): number {
        return this.customizedProducts.reduce((sum, cp) => sum + cp.getTotalPrice(), 0);
    }
}

export enum DeliveryOption {
    Delivery = 'Delivery',
    Pickup = 'Pickup'
}

export enum PaymentMethod {
    Cash = 'Cash',
    Transfer = 'Transfer'
}

