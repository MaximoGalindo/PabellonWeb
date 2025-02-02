export class ProductRequest {
    name: string = '';
    price: number = 0;
    catalogId: string = '';
    description: string = '';
    optionIds: number[] = [];
    image: File = new File([], '');
  }
  