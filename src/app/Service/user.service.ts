import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { ApiService } from './api.service';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiService?: ApiService;
  showButton: boolean = false;
  usuario: string = '';

  isLoggedIn() {
    throw new Error('Method not implemented.');
  }
  private validar = {
    email: 'prueba_auth123@hotmail.com',
    password: '12345'
  };
  
  constructor(private serviApi: ApiService, private sharedService: SharedService) { } 

  login(email: string, password: string): boolean {
    if (email === this.validar.email && password === this.validar.password) {
      localStorage.setItem('isAuthenticated', 'logged_in'); // Guarda un token básico en el localStorage
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
    localStorage.removeItem('isAuthenticated'); // Borra el token para cerrar sesión
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('isAuthenticated'); // Verifica si el token está en localStorage
  }

  // BOTON DE VISTA REGISTRAR

  canShowRegisterButton(email: string, registeredUsers: any[]): boolean {
    // Verifica si el correo es el permitido para registrar
    if (email === this.validar.email) {
      return true;
    }
    // Verifica si el correo ya está registrado en la base de datos
    return !registeredUsers.some(user => user.email === email);
  }

  // LOGIN DE SUPER USER Y REVISION DE BASE DE DATOS

  async log(email: string, password: string): Promise<boolean> {
    try {
      // Si no está en la base de datos, valida el correo de prueba
      if (email === this.validar.email && password === this.validar.password) {
        localStorage.setItem('isAuthenticated', 'logged_in');
        localStorage.setItem('doctorName', 'Dr. Master Crack'); // Guardar el nombre del doctor de prueba
        this.sharedService.setShowRegisterButton(true); // Mostrar botón en el caso del usuario de prueba
        return true;
      }


      // Llama al API para validar usuarios en la base de datos
      const users = await this.serviApi.getUsers().toPromise();

      // Busca un usuario con el correo y contraseña proporcionados
      const user = users.find((u: any) => u.email == email && u.password == password);
      const response: any = await this.serviApi.loginDoctor({ email, password }).toPromise();

      if (response.success) {
        this.usuario = response.user.nombre + ' ' + response.user.apellido;
        localStorage.setItem('isAuthenticated', 'logged_in');
        localStorage.setItem('doctorName', this.usuario); // Guardar el nombre del doctor
        this.sharedService.setShowRegisterButton(false);
        return true;
      }


      // Si no coincide con ninguno, muestra error
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Correo electrónico y/o contraseña incorrectos',
        confirmButtonText: 'Aceptar',
      });

      return false;
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo conectar al servidor',
        confirmButtonText: 'Aceptar',
      });
      return false;
    }
  }

  getDoctorName(): string {
    return localStorage.getItem('doctorName') || '';
  }
}
