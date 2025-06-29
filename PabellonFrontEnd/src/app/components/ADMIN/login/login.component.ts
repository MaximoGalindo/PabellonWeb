import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent { 

  username:string = ''
  password:string = ''
  loading:boolean = false

  constructor(
    private router: Router, 
    private loginService:LoginService,
    private alertService: AlertService
  ) {}

  login() {
    this.loading = true;
    this.loginService.login(this.username, this.password).subscribe(
      (response) => {
        sessionStorage.setItem('token', JSON.stringify(response));
        setTimeout(() => {
          this.alertService.success("Bienvenido");
          this.router.navigate(['admin/productos']);
          this.loading = false;
        }, 0);
      },
      (error) => {
        this.alertService.error('Error al iniciar sesión');
        this.loading = false
      }
    )
  }

}
