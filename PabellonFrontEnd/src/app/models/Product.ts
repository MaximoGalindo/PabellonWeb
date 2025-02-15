export class Product {
    id: number = 0;
    name: string = '';
    image: string = '';
    price: number = 0;
    catalogId: string = '';
    options: Options[] = [];
    description: string = '';
}

export class Options {
    id: number = 0;
    name: string = '';
    price: number = 0;
    isSelected: boolean = false;

    constructor(id: number = 0, name: string = '', price: number = 0, isSelected: boolean = false) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.isSelected = isSelected;
    }
}