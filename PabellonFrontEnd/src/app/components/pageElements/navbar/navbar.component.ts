import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DropdownComponent } from './dropdown/dropdown.component';
import { AlertService } from 'src/app/services/alert.service';

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

  constructor(
    private alertService: AlertService
  ) { }

  showLocation() {
    this.alertService.showLocation();
  }

  showSchedules(): void {
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

