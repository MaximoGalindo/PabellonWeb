import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/Helpers/BaseService';
import { Options } from 'src/app/models/Options';
import { OptionRequest } from 'src/app/models/Request/OptionRequest';

@Injectable({
  providedIn: 'root'
})
export class OptionsService {

  private apiUrl = `${BaseService.baseUrl}/options`;

  constructor(private http: HttpClient) { }

  getAllOptions(): Observable<Options[]> {
    return this.http.get<Options[]>(this.apiUrl);
  }

  createOption(productRequest: OptionRequest): Observable<any> {
    const formData = new FormData();

    formData.append('Name', productRequest.Name);
    formData.append('Price', productRequest.Price.toString());

    return this.http.post(this.apiUrl, formData);
  }
}
