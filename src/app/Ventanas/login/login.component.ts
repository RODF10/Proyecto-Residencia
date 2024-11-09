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

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    if (this.userService.login(this.email, this.password)) {
      // Si las credenciales son correctas, redirige a 'home'
      this.router.navigate(['home'], { replaceUrl: true });
    } else {
      // Si las credenciales son incorrectas, muestra el mensaje de error
      this.errorMessage = 'Correo electrónico o contraseña incorrectos';
    }
  }
}
