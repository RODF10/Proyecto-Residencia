import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private validar = {
    email: 'prueba_auth123@hotmail.com',
    password: '12345'
  };
  
  constructor() { } 

  login(email: string, password: string): boolean {
    if (email === this.validar.email && password === this.validar.password) {
      return true;
    } else {
      // Mostrar SweetAlert si las credenciales son incorrectas
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Correo electrónico y/o contraseña incorrectos',
        confirmButtonText: 'Aceptar'
      });
      return false;
    }
  }
}
