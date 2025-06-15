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

  confirmHTML(title: string, htmlContent: string): Promise<boolean> {
    return Swal.fire({
      title,
      html: htmlContent,
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
      timer: 6000,
      timerProgressBar: true
    });
  }

  warning(message: string): void {
    Swal.fire({
      toast: true,
      position: 'top',
      icon: 'warning',
      title: message,
      showConfirmButton: false,
      timer: 6000,
      timerProgressBar: true
    });
  }

  showLocation(): void {
    const locationIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 0 384 512" fill="currentColor" style="display: block; margin: auto;">
          <path d="M168 0C75.1 0 0 75.1 0 168c0 87.2 137.6 293.1 146.4 305.9 2.8 3.8 7.3 6.1 12 6.1s9.2-2.3 12-6.1C246.4 461.1 384 255.2 384 168 384 75.1 308.9 0 216 0h-48zM192 240c-39.8 0-72-32.2-72-72s32.2-72 72-72 72 32.2 72 72-32.2 72-72 72z"/>
        </svg>
      `;

    Swal.fire({
      title: 'Nuestra Ubicación',
      html: `
        <p><strong>Dirección:</strong><br>9 de Julio 531, Unquillo</p>
        <a href="https://www.google.com/maps?q=9+de+Julio+531,+Unquillo" 
          target="_blank" 
          style="
            display: inline-block;
            margin-top: 20px;
            padding: 10px 20px;
            background-color: #ea4335;
            color: white;
            border: none;
            border-radius: 5px;
            text-decoration: none;
            font-weight: bold;
            font-size: 14px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            transition: background-color 0.3s ease;
          "
          onmouseover="this.style.backgroundColor='#d3362b'"
          onmouseout="this.style.backgroundColor='#ea4335'">
           Ver en Google Maps
        </a>
      `,
      icon: 'info',
      iconHtml: locationIcon,
      customClass: {
        icon: 'rotate-y', // Opcional: puedes quitar esta clase si no quieres la animación
        popup: 'swal-popup-mobile'
      },
      showConfirmButton: false,
      showCloseButton: true,
      width: 400,
      backdrop: true
    });
  }

  abrirFormularioOpcion(option?: { nombre: string, precio?: number, allowQuantity?: boolean }): Promise<{ nombre: string, precio?: number, allowQuantity: boolean } | null> {
    return Swal.fire({
      title: option ? 'Editar opción' : 'Crear opción',
      html: `
      <input id="swal-nombre" class="swal2-input swal-input-mobile" placeholder="Nombre" value="${option?.nombre || ''}">
      <input id="swal-precio" type="number" class="swal2-input swal-input-mobile" placeholder="Precio (opcional)" value="${option?.precio ?? ''}">
      <div style="text-align: center; margin: 10px 0;">
        <input type="checkbox" id="swal-allowQuantity" ${option?.allowQuantity ? 'checked' : ''}>
        <label for="swal-allowQuantity">Permitir suma</label>
      </div>
    `,
      customClass: {
        popup: 'swal-popup-mobile'
      },
      showCancelButton: true,
      confirmButtonText: option ? 'Guardar' : 'Crear',
      cancelButtonText: 'Cancelar',
      focusConfirm: false,
      backdrop: true,
      allowOutsideClick: false,
      allowEscapeKey: true,
      preConfirm: () => {
        const nombre = (document.getElementById('swal-nombre') as HTMLInputElement).value.trim();
        const precioStr = (document.getElementById('swal-precio') as HTMLInputElement).value;
        const allowQuantity = (document.getElementById('swal-allowQuantity') as HTMLInputElement).checked;

        if (!nombre) {
          Swal.showValidationMessage('El nombre es obligatorio');
          return;
        }

        const precio = precioStr ? parseFloat(precioStr) : 0;

        if (precioStr && isNaN(precio)) {
          Swal.showValidationMessage('El precio debe ser un número válido');
          return;
        }

        return { nombre, precio, allowQuantity };
      }
    }).then(result => result.isConfirmed ? result.value : null);
  }


  showSchedules(schedules: { day: string, from: string, to: string, available: boolean }[]): void {
    const scheduleHtml = schedules.map(h => {
      if (!h.available) {
        return `<div style="margin: 4px 0;"><strong>${h.day}:</strong> <span style="color: red;">CERRADO</span></div>`;
      }
      return `<div style="margin: 4px 0;"><strong>${h.day}:</strong> ${h.from} a ${h.to}</div>`;
    }).join('');

    Swal.fire({
      title: 'Horarios',
      html: scheduleHtml,
      showCloseButton: true,
      showConfirmButton: false,
      width: 400,
      customClass: {
        popup: 'swal-popup-mobile'
      },
      backdrop: true
    });;
  }


}
