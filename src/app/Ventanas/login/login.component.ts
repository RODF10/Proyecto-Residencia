import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Service/api.service';
import { SharedService } from 'src/app/Service/shared.service';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router, private apiService: ApiService, private sharedService: SharedService) {}

  ngOnInit(): void {
      localStorage.removeItem('doctorName');
  }

  /*onSubmit() {
    if (this.userService.login(this.email, this.password)) {
      // Si las credenciales son correctas, redirige a 'home'
      this.router.navigate(['home'], { replaceUrl: true });
    } else {
      // Si las credenciales son incorrectas, muestra el mensaje de error
      this.errorMessage = 'Correo electrónico o contraseña incorrectos';
    }
  }*/

    async onSubmit() {
      const isLoggedIn = await this.userService.log(this.email, this.password);
  
      if (isLoggedIn) {
        this.sharedService.setShowRegisterButton(false);
        this.router.navigate(['home'], { replaceUrl: true });
      } else {
        this.errorMessage = 'Correo electrónico o contraseña incorrectos';
      }
    }
  
}
