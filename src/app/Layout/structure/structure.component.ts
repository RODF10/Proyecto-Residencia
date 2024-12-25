import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/Service/navbar.service';
import { UserService } from 'src/app/Service/user.service';
import { SharedService } from 'src/app/Service/shared.service';
import { LoadJSService } from 'src/app/Service/load-js.service';
import { ApiService } from 'src/app/Service/api.service';

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
  doctorID = 0; //Determinar el ID del Doctor
  image: string = '';

  constructor(private observer: BreakpointObserver, private router: Router, private authService: NavbarService, private userService: UserService, private sharedService: SharedService, 
    private LoadJS: LoadJSService, private apiService: ApiService){
    LoadJS.Carga(["Profile"]);
  }

  ngOnInit(): void{
    this.doctorID = this.userService.getDoctorId(); //Solo el Doctor Master puede registrar Doctores
    this.loadImage(this.doctorID);
    this.apiService.image$.subscribe((imageUrl) =>{
      this.image = imageUrl;
    });
    this.observer.observe(["(max-width: 900px)"])
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = "over";
          this.sidenav.close();
        } else {
          this.sidenav.mode = "side";
          this.sidenav.open();
        }
      });
      this.name = 'Dr. ' + this.userService.getDoctorName();
      // Recupera la URL de la imagen del perfil desde localStorage
      const storedImage = localStorage.getItem('doctorImage');
      //this.image = storedImage && storedImage != 'null' ? storedImage : 'assets/Imagenes/default-profile.png';

      this.sharedService.showRegisterButton$.subscribe(show => {
        this.showRegisterButton = show;
      });   
    
    console.log(this.image);
    console.log(localStorage.getItem('doctorImage'));
  }

  loadImage(id: number){
    /*this.apiService.getDoctorImage(id).subscribe({
      next: (response) =>{
        this.image = response.imagen;
      }, error: (err) => {
        console.log('Error al cargar: ', err);
      }
    });*/
    this.apiService.getDoctorImage(id).subscribe({
      next: (response) => {
        const timestamp = new Date().getTime(); // Añadir timestamp para evitar caché
        if (response.imagen.startsWith('data:')) {
          this.apiService.getUpdateImage(response.imagen); // Actualiza la imagen con Base64
        } else {
          this.apiService.getUpdateImage(response.imagen); // Actualiza la imagen con URL
        }
      },
      error: (err) => {
        console.error('Error al cargar la imagen:', err);
      },
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
