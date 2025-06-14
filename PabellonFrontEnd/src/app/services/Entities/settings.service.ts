import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/Helpers/BaseService';
import { Settings } from 'src/app/models/Settings';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private apiUrl = `${BaseService.baseUrl}/settings`;

  constructor(private http: HttpClient) { }

  getSettings(): Observable<Settings[]> {
    return this.http.get<Settings[]>(`${this.apiUrl}`);
  }

  saveSettings(settings: Settings[]): Observable<any> {
    const formData = new FormData();

    settings.forEach((setting, index) => {
      formData.append(`settings[${index}].Key`, setting.key);
      formData.append(`settings[${index}].Value`, setting.value);
    });

    return this.http.post(`${this.apiUrl}`, formData);
  }

  checkStoreAvaible(): Observable<any> {
    return this.http.get(`${this.apiUrl}/store-avaible`);
  }
}
