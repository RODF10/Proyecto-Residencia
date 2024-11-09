import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private valid: UserService, private router: Router){

  }

  onSubmit() {
    if (this.valid.login(this.email, this.password)) {
      // Lógica de autenticación exitosa

      // Redirigir al usuario a la página de inicio
      this.router.navigate(['login/home']);

      // Reemplazar la URL actual en el historial para evitar retroceder
      window.history.replaceState({}, document.title, '/home');
    } else {
      // Mostrar mensaje de error si la autenticación falla
      this.errorMessage = 'Correo electrónico o contraseña incorrectos';
    }
  }
}
