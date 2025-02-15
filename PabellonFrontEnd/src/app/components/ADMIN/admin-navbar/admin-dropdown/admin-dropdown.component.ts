import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-admin-dropdown',
  templateUrl: './admin-dropdown.component.html',
  styleUrls: ['./admin-dropdown.component.css']
})
export class AdminDropdownComponent {
  @Input() isMenuOpen = false;
  @Output() isMenuOpenEvent = new EventEmitter<boolean>();

  emitIsMenuOpen() {
    this.isMenuOpen = !this.isMenuOpen
    this.isMenuOpenEvent.emit(this.isMenuOpen);
  }
}
