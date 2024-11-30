import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/Service/navbar.service';
import { UserService } from 'src/app/Service/user.service';
import { SharedService } from 'src/app/Service/shared.service';
import { LoadJSService } from 'src/app/Service/load-js.service';

@Component({
  selector: 'app-structure',
  templateUrl: './structure.component.html',
  styleUrls: ['./structure.component.scss']
})
export class StructureComponent {
  @ViewChild(MatSidenav, { static: true })
  sidenav!: MatSidenav;

  dropdownOpen = false;
  showRegisterButton: boolean = false;
  name: string = '';

  constructor(private observer: BreakpointObserver, private router: Router, private authService: NavbarService, private userService: UserService, private sharedService: SharedService, private LoadJS: LoadJSService){
    LoadJS.Carga(["Profile"]);
  }

  ngOnInit(): void{
    this.observer.observe(["(max-width: 720px)"])
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = "over";
          this.sidenav.close();
        } else {
          this.sidenav.mode = "side";
          this.sidenav.open();
        }
      });
      this.name = this.userService.getDoctorName();
      this.sharedService.showRegisterButton$.subscribe(show => {
        this.showRegisterButton = show;
      }); 
  }

  mainPage(){
    this.router.navigate(['home']);
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
