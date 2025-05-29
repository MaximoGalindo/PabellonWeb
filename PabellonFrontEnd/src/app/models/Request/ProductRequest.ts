export class ProductRequest {
  Name: string = '';
  Price: number = 0;
  CatalogId: string = '';
  Description: string = '';
  OptionIds: number[] = [];
  Image: File = new File([], '');
}
