import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.checkLoginStatus());
  isLoggedUser$ = this.isLoggedInSubject.asObservable();

  constructor() {}

  private checkLoginStatus(): boolean {
    return !!sessionStorage.getItem('token');
  }

}
