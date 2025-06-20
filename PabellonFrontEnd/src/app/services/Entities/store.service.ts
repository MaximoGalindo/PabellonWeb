import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/Helpers/BaseService';
import { Store } from 'src/app/models/Store';
import { StoreRequest } from 'src/app/models/Request/StoreRequest';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private apiUrl = `${BaseService.baseUrl}/store`;

  constructor(private http: HttpClient) {}

  getStore(): Observable<Store> {
    return this.http.get<Store>(this.apiUrl);
  }

  saveStore(req: StoreRequest): Observable<any> {
    const formData = new FormData();
    formData.append('Name', req.Name);
    formData.append('PhoneNumber', req.PhoneNumber);
    formData.append('Address', req.Address);
    formData.append('Description', req.Description);
    return this.http.post(this.apiUrl, formData);
  }
}
