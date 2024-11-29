import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  // Método para mostrar un mensaje de éxito
  success(message: string, title: string) {
    Swal.fire({
        title: title,
        text: message,
        icon: 'success',
        confirmButtonText: 'Aceptar',
    });
  }

  // Método para mostrar un mensaje de error
  error(message: string, title: string) {
    Swal.fire({
        title: title,
        text: message,
        icon: 'error',
        confirmButtonText: 'Aceptar',
    });
  }

  // Método para mostrar una alerta de confirmación
  confirm(
    message: string,
    title: string = 'Confirmación',
    confirmButtonText: string = 'Sí',
    cancelButtonText: string = 'No'
): Promise<boolean> {
    return Swal.fire({
        title: title,
        text: message,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: confirmButtonText,
        cancelButtonText: cancelButtonText,
    }).then((result) => result.isConfirmed);
  }

  // Método para mostrar una alerta de advertencia
  warning(message: string, title: string){
      Swal.fire({
        title: title,
        icon: 'warning',
        text: message,
        confirmButtonText: 'Aceptar'
      });
  }
}
