import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLoggedIn() {
    throw new Error('Method not implemented.');
  }
  private validar = {
    email: 'prueba_auth123@hotmail.com',
    password: '12345'
  };
  
  constructor() { } 

  login(email: string, password: string): boolean {
    if (email === this.validar.email && password === this.validar.password) {
      localStorage.setItem('authToken', 'logged_in'); // Guarda un token básico en el localStorage
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

  logout(): void {
    localStorage.removeItem('authToken'); // Borra el token para cerrar sesión
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken'); // Verifica si el token está en localStorage
  }
}
