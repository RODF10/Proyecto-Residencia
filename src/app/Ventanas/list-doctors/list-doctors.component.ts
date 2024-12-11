import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/Service/alert.service';
import { ApiService } from 'src/app/Service/api.service';
import { SharedService } from 'src/app/Service/shared.service';

@Component({
  selector: 'app-list-doctors',
  templateUrl: './list-doctors.component.html',
  styleUrls: ['./list-doctors.component.scss']
})
export class ListDoctorsComponent implements OnInit{
  showTableMaster: boolean = false; //vista del boton SuperMaster
  // Doctores
  users: any[] = [];
  user: any = {};

  constructor(private apiService: ApiService, private alertService: AlertService, private sharedService: SharedService, private router: Router){}

  ngOnInit(): void {
    this.fetchUsers();
      this.sharedService.showRegisterButton$.subscribe(show => {
        this.showTableMaster = show;
      });      
  }


  eliminarUsuario(id: number, name: string): void {
    console.log('Eliminar usuario con ID:', id ,name);
    // Utilizar el servicio AlertService para mostrar la confirmación
    this.alertService
    .confirm(`¿Estás seguro de que deseas eliminar al doctor "${name}"?`, 'Confirmación')
    .then((isConfirmed) => {
      if (isConfirmed) {
        // Llamar al API para eliminar al doctor si se confirma
        this.apiService.deleteDoctor(id).subscribe({
          next: (response) => {
            // Mostrar mensaje de éxito
            this.alertService.success(
              `El doctor "${name}" ha sido eliminado exitosamente.`,
              'Eliminado'
            );
            this.cargarDoctores(); // Refrescar la lista de doctores
          },
          error: (error) => {
            console.error('Error al eliminar el doctor:', error);
            // Mostrar mensaje de error
            this.alertService.error(
              `No se pudo eliminar al doctor "${name}". Inténtalo nuevamente.`,
              'Error'
            );
          },
        });
      }
    });
    // Agrega aquí la lógica para eliminar el usuario
  }
  
  actualizarUsuario(id: number): void {
    console.log('Actualizar usuario con ID:', id);
    // Agrega aquí la lógica para actualizar el usuario
  }

  cargarDoctores(): void {
    this.apiService.getUsers().subscribe({
      next: (users) => this.users = users, // Asigna los usuarios recibidos al array "users"
      error: (error) => console.error('Error al cargar la lista de doctores:', error)
    });
  }

  
  fetchUsers() {
    this.apiService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  register(){
    this.router.navigate(['home/doctors-register']);
  }
}