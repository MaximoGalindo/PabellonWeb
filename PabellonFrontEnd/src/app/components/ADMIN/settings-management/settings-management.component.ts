import { Component } from '@angular/core';
import { SettingNames, SettingsKey } from 'src/app/Helpers/SettingsKey';
import { Settings } from 'src/app/models/Settings';
import { AlertService } from 'src/app/services/alert.service';
import { SettingsService } from 'src/app/services/Entities/settings.service';

@Component({
  selector: 'app-settings-management',
  templateUrl: './settings-management.component.html',
  styleUrls: ['./settings-management.component.css']
})
export class SettingsManagementComponent {
  loading: boolean = false
  settings: Settings[] = []

  constructor(
    private settingsService: SettingsService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.getSettings()
  }

  getSettings() {
    this.loading = true
    this.settingsService.getSettings().subscribe({
      next: (data) => {
        this.settings = data
        this.loading = false
      },
      error: (error) => {
        this.loading = false
      },
      complete: () => {
        this.loading = false
      }
    })
  }

  saveSettings() {
    this.loading = true

    this.settingsService.saveSettings(this.settings).subscribe({
      next: (data) => {
        this.alertService.success('Ajustes guardados exitosamente')
        this.loading = false
      },
      error: (error) => {
        this.alertService.error('Error al guardar los ajustes')
        this.loading = false
      },
      complete: () => {
        this.loading = false
      }
    })
  }

  getSettingName(key: string) {
    return SettingNames[key]
  }

  isHour(key: string): boolean {
    return key.startsWith('store_');
  }

  getStartHour(value: string): string {
    return value?.split('-')[0] || '';
  }

  getEndHour(value: string): string {
    return value?.split('-')[1] || '';
  }

  onStartHourChange(setting: Settings, newStart: string) {
    const [, end] = (setting.value || '').split('-');
    setting.value = `${newStart}-${end || ''}`;
  }

  onEndHourChange(setting: Settings, newEnd: string) {
    const [start] = (setting.value || '').split('-');
    setting.value = `${start || ''}-${newEnd}`;
  }

  isClosed(value: string): boolean {
    if (!value || !value.includes('-')) return true;
    const [start, end] = value.split('-');
    return !start || !end;
  }


  onDayToggle(setting: any, event: Event): void {
    const input = event.target as HTMLInputElement;
    const isChecked = input.checked;

    if (isChecked) {
      if (!setting.value || this.isClosed(setting.value)) {
        setting.value = '00:00-00:00';
      }
    } else {
      setting.value = '';
    }
  }


}
