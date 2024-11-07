import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent {
  @Input() isMenuOpen = false;
  @Output() isMenuOpenEvent = new EventEmitter<boolean>();

  emitIsMenuOpen() {
    this.isMenuOpen = !this.isMenuOpen
    console.log(this.isMenuOpen);
    
    this.isMenuOpenEvent.emit(this.isMenuOpen);
  }
}
