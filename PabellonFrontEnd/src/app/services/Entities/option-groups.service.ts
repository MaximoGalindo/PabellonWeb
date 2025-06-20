import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/Helpers/BaseService';
import { OptionGroup } from 'src/app/models/OptionGroup';
import { OptionGroupRequest } from 'src/app/models/Request/OptionGroupRequest';

@Injectable({
  providedIn: 'root'
})
export class OptionGroupsService {
  private apiUrl = `${BaseService.baseUrl}/option-groups`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<OptionGroup[]> {
    return this.http.get<OptionGroup[]>(this.apiUrl);
  }

  create(request: OptionGroupRequest): Observable<any> {
    const formData = new FormData();
    formData.append('Name', request.Name);
    formData.append('MaxQuantity', request.MaxQuantity.toString());
    request.OptionIds.forEach(id => formData.append('OptionIds', id.toString()));
    return this.http.post(this.apiUrl, formData);
  }

  update(id: number, request: OptionGroupRequest): Observable<any> {
    const formData = new FormData();
    formData.append('Name', request.Name);
    formData.append('MaxQuantity', request.MaxQuantity.toString());
    request.OptionIds.forEach(i => formData.append('OptionIds', i.toString()));
    return this.http.put(`${this.apiUrl}/${id}`, formData);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
