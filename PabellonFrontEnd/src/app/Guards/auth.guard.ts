import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = sessionStorage.getItem('token');

    if (!token || this.isTokenExpired(token)) {
      this.router.navigate(['admin/login']);
      return false;
    }
    
    return true;
  }

  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiryTime = payload.exp * 1000;
      return Date.now() > expiryTime;
    } catch (e) {
      return true;
    }
  }
}
