
export class Options {
    id: number = 0;
    name: string = '';
    price: number = 0;
    allowQuantity: boolean = false;
    quantity: number = 0;
    isSelected: boolean = false;

    constructor(id: number = 0, name: string = '', price: number = 0, isSelected: boolean = false, allowQuantity: boolean = false, quantity: number = 0) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.isSelected = isSelected;
        this.allowQuantity = allowQuantity;
        this.quantity = quantity
    }
}