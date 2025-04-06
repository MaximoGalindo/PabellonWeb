import { Injectable } from '@angular/core';
import { BaseService } from '../Helpers/BaseService';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

    private apiUrl = `${BaseService.baseUrl}/login`;
  
    constructor(private http: HttpClient) {}
  
    login(username:string, password:string): Observable<string> {
      return this.http.post<string>(`${this.apiUrl}`, { username, password });
    }
}
