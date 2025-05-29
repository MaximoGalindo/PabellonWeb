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
}
