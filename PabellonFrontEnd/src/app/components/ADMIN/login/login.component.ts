import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent { 
  
  constructor(private router: Router) {}

  login() {
    console.log('login');
    
    const user = { Id: 1, Name: 'Admin' };
    sessionStorage.setItem('user', JSON.stringify(user));

    this.router.navigate(['admin/productos']); 
  }

}
