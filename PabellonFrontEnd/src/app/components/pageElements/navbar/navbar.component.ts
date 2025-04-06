import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DropdownComponent } from './dropdown/dropdown.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input() isMobile = false;
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
