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
}