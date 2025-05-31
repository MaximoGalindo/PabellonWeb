import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  confirm(title: string, text: string): Promise<boolean> {
    return Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then(result => result.isConfirmed);
  }

  success(message: string): void {
    Swal.fire({
      toast: true,
      position: 'top',
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true
    });
  }

  error(message: string): void {
    Swal.fire({
      toast: true,
      position: 'top',
      icon: 'error',
      title: message,
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true
    });
  }

  crearOpcion(): Promise<{ nombre: string, precio?: number } | null> {
    return Swal.fire({
      title: 'Crear opción',
      html: `
      <input id="swal-nombre" class="swal2-input swal-input-mobile" placeholder="Nombre" style="max-width: 100%; font-size: 14px;">
      <input id="swal-precio" type="number" class="swal2-input swal-input-mobile" placeholder="Precio (opcional)" style="max-width: 100%; font-size: 14px;">
    `,
      showCancelButton: true,
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar',
      focusConfirm: false,
      preConfirm: () => {
        const nombre = (document.getElementById('swal-nombre') as HTMLInputElement).value.trim();
        const precioStr = (document.getElementById('swal-precio') as HTMLInputElement).value;

        if (!nombre) {
          Swal.showValidationMessage('El nombre es obligatorio');
          return;
        }

        const precio = precioStr ? parseFloat(precioStr) : 0;

        if (precioStr && isNaN(precio)) {
          Swal.showValidationMessage('El precio debe ser un número válido');
          return;
        }

        return { nombre, precio };
      }
    }).then(result => result.isConfirmed ? result.value : null);
  }

}
