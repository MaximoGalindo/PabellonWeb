import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Options } from 'src/app/models/Options';
import { OptionRequest } from 'src/app/models/Request/OptionRequest';
import { AlertService } from 'src/app/services/alert.service';
import { OptionsService } from 'src/app/services/Entities/options.service';

@Component({
  selector: 'app-options-management',
  templateUrl: './options-management.component.html',
  styleUrls: ['./options-management.component.css']
})
export class OptionsManagementComponent {
  loading: boolean = false
  options: Options[] = [];

  constructor(
    private router: Router,
    private optionService: OptionsService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.getOptions();
  }

  getOptions(): void {
    this.loading = true;
    this.optionService.getAllOptions().subscribe(options => {
      this.options = options;
      this.loading = false;
    });
  }

  addOption(): void {
    this.alertService.abrirFormularioOpcion().then(data => {
      if (data) {
        const optionRequest: OptionRequest = {
          Name: data.nombre,
          Price: data.precio ? data.precio : 0,
          AllowQuantity: data.allowQuantity
        };

        this.optionService.createOption(optionRequest).subscribe({
          next: () => {
            this.getOptions();
            this.alertService.success('Opción creada exitosamente');
          },
          error: (error) => {
            this.alertService.error(error.error.message);
          },
          complete: () => {
            this.loading = false;
          }
        });
      }
    });
  }

  editOption(option: Options): void {
    const actualOption = { nombre: option.name, precio: option.price, allowQuantity: option.allowQuantity };
    this.alertService.abrirFormularioOpcion(actualOption).then(data => {
      if (data) {
        const optionRequest: OptionRequest = {
          Name: data.nombre,
          Price: data.precio ? data.precio : 0,
          AllowQuantity: option.allowQuantity
        };

        this.optionService.updateOption(option.id, optionRequest).subscribe({
          next: () => {
            this.getOptions();
            this.alertService.success('Opción actualizada exitosamente');
          },
          error: (error) => {
            this.alertService.error(error.error.message);
          },
          complete: () => {
            this.loading = false;
          }
        });
      }
    });
  }

  deleteOption(option: Options): void {
    this.optionService.getProductNameByOptionId(option.id).subscribe(data => {
      let message = '';
      if (data.length > 0) {
        const lista = data.map(item => `<li>${item}</li>`).join('');
        message = `
          <p>Esta opción se encuentra asociada a los siguientes productos:</p>
          <ul style="text-align: left; padding-left: 1.2rem;">${lista}</ul>
          <p><strong>¿Estás seguro de eliminar esta opción?</strong></p>
        `;
      } else {
        message = '¿Estás seguro de eliminar esta opción?';
      }

      this.alertService.confirmHTML("Eliminar Opcion", message).then((result) => {
        if (result) {
          this.optionService.deleteOption(option.id).subscribe({
            next: (data) => {
              this.alertService.success("Opcion Eliminada")
              this.getOptions()
            },
            error: (error) => {
              this.alertService.error("Error al eliminar la opcion")
            },
            complete: () => {
              this.loading = false;
            }
          });
        }
      });
    });


  }
}
