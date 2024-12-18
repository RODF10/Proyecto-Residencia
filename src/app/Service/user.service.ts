import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { ApiService } from './api.service';
import { SharedService } from './shared.service';
import { AlertService } from './alert.service';

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
    id: 1,
    email: 'prueba_auth123@hotmail.com',
    password: '12345'
  };
  
  constructor(private serviApi: ApiService, private sharedService: SharedService, private alert: AlertService) { } 

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
    localStorage.removeItem('isAuthenticated');// Borra el token para cerrar sesión
    localStorage.removeItem('doctorName'); // Eliminar Nombre
    localStorage.removeItem('idDoctor'); // Eliminar el ID Doctor
    localStorage.removeItem('doctorImage')// Eliminar la imagen del Doctor
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
      /* Si no está en la base de datos, valida el correo de prueba
      if (email === this.validar.email && password === this.validar.password) {
        localStorage.setItem('isAuthenticated', 'logged_in');
        localStorage.setItem('doctorName', 'Dr. Master Crack'); // Guardar el nombre del doctor de prueba
        this.sharedService.setShowRegisterButton(true); // Mostrar botón en el caso del usuario de prueba
        localStorage.setItem('idDoctor', '1');
        return true;
      }*/

      // Busca un usuario con el correo y contraseña proporcionados
      const response: any = await this.serviApi.loginDoctor({ email, password }).toPromise();

      if (response.success) {
        this.usuario = response.user.nombre + ' ' + response.user.apellido;
        localStorage.setItem('isAuthenticated', 'logged_in');
        localStorage.setItem('doctorName', this.usuario); // Guardar el nombre del doctor
        localStorage.setItem('idDoctor', response.user.id.toString());
         // Guardar la URL de la imagen del perfil en localStorage
        localStorage.setItem('doctorImage', response.user.imagen); // Asumiendo que 'profile_image' es el campo con la URL de la imagen
        this.sharedService.setShowRegisterButton(false);
        return true;
      }
      this.alert.warning('Correo no Valido','El correo no está registrado.')
      return false;
    } catch (error: any) {
      console.error('Error al obtener usuarios:', error);
    
    if (error?.status == 401) {
      // Si el servidor devuelve 401, muestra un mensaje adecuado
      this.alert.warning('Error Entrada', 'Correo electrónico y/o contraseña incorrectos');
    } else if(error?.status == 422){
      this.alert.error('Error de Ingreso', 'Correo o contraseña invalidos')
    } else {
      // Si hay otro tipo de error (como de red o servidor)
      this.alert.disconnected('Error', 'No se pudo conectar al servidor');
    }
    return false;
  }
  }

  getDoctorName(): string {
    return localStorage.getItem('doctorName') || '';
  }
  getDoctorId(): number {
    const id = localStorage.getItem('idDoctor');
    return id ? parseInt(id, 10) : 0; // Convierte a número o devuelve 0 si no está definido
  }
}
