export class Product {
    id: number = 0;
    name: string = '';
    imageUrl: string = '';
    price: number = 0;
    catalogId: number = 0;
    options: Options[] = [];
}

export class Options {
    id: number = 0;
    name: string = '';
    price: number = 0;
    isSelected: boolean = false;

    constructor(id: number, name: string, price: number, isSelected: boolean = false) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.isSelected = isSelected;
    }
}