import { Options } from "./Options";

export class Product {
    id: number = 0;
    name: string = '';
    image: string = '';
    price: number = 0;
    catalogId: string = '';
    options: Options[] = [];
    description: string = '';
    disabled: boolean = false;
    quantity: number = 0
}

export class CustomizedProduct {
    id: string = generateUUID();
    product: Product;
    selectedOptions: Options[] = [];
    selectedQuantities: { [optionId: number]: number } = {};

    constructor(product: Product) {
        this.product = product;
    }

    getTotalPrice(): number {
        let total = this.product.price;
        this.selectedOptions.forEach(opt => total += opt.price);
        return total;
    }
}

function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}