import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/Helpers/BaseService';
import { Product } from 'src/app/models/Product';
import { ProductRequest } from 'src/app/models/Request/ProductRequest';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = `${BaseService.baseUrl}/products`;

  constructor(private http: HttpClient) {}

  getProductByCatalogId(catalogId: string, orderBy: boolean): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/catalog/${catalogId}/${orderBy}`);
  }

  createProduct(productRequest: ProductRequest): Observable<any> {
    const formData = new FormData();

    formData.append('Name', productRequest.Name);
    formData.append('Price', productRequest.Price.toString());
    formData.append('CatalogId', productRequest.CatalogId);
    formData.append('Description', productRequest.Description);
    formData.append('Quantity', productRequest.Quantity.toString());

    // Serializar el array de OptionIds
    productRequest.OptionIds.forEach((id, index) => {
      formData.append(`OptionIds[${index}]`, id.toString());
    });

    // Agregar la imagen solo si existe
    if (productRequest.Image) {
      formData.append('Image', productRequest.Image);
    }

    return this.http.post(this.apiUrl, formData);
  }

  updateProduct(id: number, productRequest: ProductRequest): Observable<any> {
    const formData = new FormData();

    formData.append('Name', productRequest.Name);
    formData.append('Price', productRequest.Price.toString());
    formData.append('CatalogId', productRequest.CatalogId);
    formData.append('Description', productRequest.Description);
    formData.append('Quantity', productRequest.Quantity.toString());

    // Serializar el array de OptionIds
    productRequest.OptionIds.forEach((id, index) => {
      formData.append(`OptionIds[${index}]`, id.toString());
    });

    // Agregar la imagen solo si existe
    if (productRequest.Image) {
      formData.append('Image', productRequest.Image);
    }
    
    return this.http.put(`${this.apiUrl}/${id}`, formData);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  disableProduct(id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/disable/${id}`, {});
  }

  getProductByName(catalogId:string, query: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/${catalogId}/${query}/`);
  }

}
