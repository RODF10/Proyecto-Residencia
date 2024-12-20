import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private apiService: ApiService) { }

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
  
  // Método para mostrar una alerta de advertencia
  disconnected(message: string, title: string){
      Swal.fire({
        title: title,
        icon: 'question',
        text: message,
        confirmButtonText: 'Aceptar'
      });
  }

   // Método para confirmar la contraseña antes de cambiarla
   async confirmPasswordChange(doctorId: number): Promise<boolean> {
    const result = await Swal.fire({
      icon: 'info',
      title: 'Confirma tu contraseña',
      input: 'password',  // Tipo de entrada es 'password'
      inputAttributes: {
        autocapitalize: 'off',
        placeholder: 'Ingresa tu contraseña'
      },
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      showLoaderOnConfirm: true,
      preConfirm: async (password) => {
        try {
          const isValid = await this.apiService.verifyDoctorPassword(doctorId, password).toPromise();
          if (!isValid) {
            return Swal.showValidationMessage('Contraseña incorrecta');
          }
          return isValid; // Si la contraseña es válida, la retornamos
        } catch (error) {
          Swal.showValidationMessage(`Request Failed: ${error}`);
        }
      }
      ,
      allowOutsideClick: () => !Swal.isLoading()  // Permitir hacer clic fuera si no se está cargando
    });

    // Devolvemos si el usuario ha confirmado correctamente
    return result.isConfirmed;
  }
}
