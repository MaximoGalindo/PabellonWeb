import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/Helpers/BaseService';
import { Options } from 'src/app/models/Options';

@Injectable({
  providedIn: 'root'
})
export class OptionsService {

  private apiUrl = `${BaseService.baseUrl}/options`;

  constructor(private http: HttpClient) { }

  getAllOptions() : Observable<Options[]> {
    return this.http.get<Options[]>(this.apiUrl);
  }
}
