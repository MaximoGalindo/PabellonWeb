import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-dropdown',
  templateUrl: './admin-dropdown.component.html',
  styleUrls: ['./admin-dropdown.component.css']
})
export class AdminDropdownComponent {
  @Input() isMenuOpen = false;
  @Output() isMenuOpenEvent = new EventEmitter<boolean>();

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  emitIsMenuOpen() {
    this.isMenuOpen = !this.isMenuOpen
    this.isMenuOpenEvent.emit(this.isMenuOpen);
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['admin/login']);
  }
}
