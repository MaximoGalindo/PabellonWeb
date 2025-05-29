import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Catalog } from 'src/app/models/Catalog';
import { BaseService } from 'src/app/Helpers/BaseService';
import { CatalogRequest } from 'src/app/models/Request/CatalogRequest';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  private apiUrl = `${BaseService.baseUrl}/catalogs`;

  constructor(private http: HttpClient) { }

  getAllCatalogs(): Observable<Catalog[]> {
    return this.http.get<Catalog[]>(this.apiUrl);
  }

  getCatalosName(): Observable<Catalog[]> {
    return this.http.get<Catalog[]>(`${this.apiUrl}/names`);
  }

  getCatalogById(id: string): Observable<Catalog> {
    return this.http.get<Catalog>(`${this.apiUrl}/${id}`);
  }

  createCatalog(catalogRequest: CatalogRequest): Observable<any> {
    const formData = new FormData();

    formData.append('Name', catalogRequest.Name);
    formData.append('Order', catalogRequest.Order.toString());

    // Agregar la imagen solo si existe
    if (catalogRequest.Image) {
      formData.append('ImgUrl', catalogRequest.Image);
    }

    return this.http.post(this.apiUrl, formData);
  }

  updateCatalog(id: string, catalogRequest: CatalogRequest): Observable<any> {
    const formData = new FormData();

    formData.append('Name', catalogRequest.Name);
    formData.append('Order', catalogRequest.Order.toString());

    if (catalogRequest.Image) {
      formData.append('ImgUrl', catalogRequest.Image);
    }
    
    return this.http.put(`${this.apiUrl}/${id}`, formData);
  }

  deleteCatalog(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
