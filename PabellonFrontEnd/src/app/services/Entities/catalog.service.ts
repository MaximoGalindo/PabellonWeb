import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Catalog } from 'src/app/models/Catalog';
import { BaseService } from 'src/app/Helpers/BaseService';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  private apiUrl = `${BaseService.baseUrl}/catalogs`;

  constructor(private http: HttpClient) {}

  getAllCatalogs(): Observable<Catalog[]> {
    return this.http.get<Catalog[]>(this.apiUrl);
  }
}
