import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadJSService } from 'src/app/Service/load-js.service';
import { NavbarService } from 'src/app/Service/navbar.service';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  dropdownOpen = false;

  constructor(
    private LoadJS: LoadJSService,
    private router: Router,
    public authService: NavbarService,
    private userService: UserService // Inyecta UserService para la autenticación
    ){
    LoadJS.Carga(["Profile"]);
  }

  mainPage(){
    this.router.navigate(['home']);
  }

  ngOnInit() {
    /*this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/login') {
          this.varService.hide();
        } else {
          this.varService.show();
        }
      }
    });*/
  }

  login() {
    this.authService.login();
    this.router.navigate(['/home/principal']); // Redirige a la página principal
  }

  logout() {
    this.userService.logout(); // Llama al método logout del servicio de usuario
    this.router.navigate(['/login']); // Redirige al login después de cerrar sesión
  }
}
