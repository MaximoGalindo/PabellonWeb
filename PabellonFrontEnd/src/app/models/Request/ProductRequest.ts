export class ProductRequest {
  Name: string = '';
  Price: number = 0;
  CatalogId: string = '';
  Description: string = '';
  OptionIds: number[] = [];
  Quantity: number = 0;
  Image: File = new File([], '');
}
