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

  showSchedules(): void {
    this.emitIsMenuOpen();
    const settings = JSON.parse(sessionStorage.getItem('settings') || '[]');
    const schedules = this.getSchedulesFromSettings(settings);
    this.alertService.showSchedules(schedules);
  }
  getSchedulesFromSettings(settings: any[]): { day: string, from: string, to: string, available: boolean }[] {
    const dayMap: { [key: string]: string } = {
      store_monday: 'Lunes',
      store_tuesday: 'Martes',
      store_wednesday: 'Miércoles',
      store_thursday: 'Jueves',
      store_friday: 'Viernes',
      store_saturday: 'Sábado',
      store_sunday: 'Domingo'
    };
    
    return settings
      .filter(s => s.key.startsWith('store_'))
      .map(s => {
        const [from, to] = (s.value || '').split('-');
        return {
          day: dayMap[s.key] || s.key,
          from: from || '',
          to: to || '',
          available: !!s.value
        };
      });
  }

}
