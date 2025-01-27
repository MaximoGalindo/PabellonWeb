import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/Helpers/BaseService';
import { Product } from 'src/app/models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = `${BaseService.baseUrl}/products`;

  constructor(private http: HttpClient) {}

  getProductByCatalogId(catalogId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/by-catalog/${catalogId}`);
  }

}
