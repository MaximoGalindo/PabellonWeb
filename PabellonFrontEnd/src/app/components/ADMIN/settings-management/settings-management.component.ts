import { Component } from '@angular/core';
import { SettingsKey } from 'src/app/Helpers/SettingsKey';
import { Settings } from 'src/app/models/Settings';
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
    private settingsService: SettingsService
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

  getSettingName(key: string) {
    switch (key) {
      case SettingsKey.SHIPING_COST:
        return 'Costo de envío'
      default:
        return key
    }
  }
}
