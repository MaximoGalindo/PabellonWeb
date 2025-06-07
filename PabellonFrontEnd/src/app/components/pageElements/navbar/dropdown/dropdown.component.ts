import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';

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
    this.isMenuOpenEvent.emit(this.isMenuOpen);
  }

  constructor(
    private alertService: AlertService
  ) { }


  mostrarUbicacion() {
    this.emitIsMenuOpen();
    this.alertService.showLocation();
  }

  showSchedules() {
    this.emitIsMenuOpen();
    this.alertService.showSchedules();
  }

  
}
