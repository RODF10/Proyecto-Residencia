import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/Service/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from 'src/app/Service/alert.service';
import { SharedService } from 'src/app/Service/shared.service';

@Component({
  selector: 'app-list-person',
  templateUrl: './list-person.component.html',
  styleUrls: ['./list-person.component.scss']
})
export class ListPersonComponent implements OnInit{
  showTableMaster: boolean = false; //vista del boton SuperMaster
  pacienteForm: FormGroup;
  submitted = false;
  pacientes: any[] = []; // Array para almacenar los pacientes registrados
  // Doctorea
  users: any[] = [];
  user: any = {};
  selectedFile: File | null = null;

  // Objeto para almacenar los datos del formulario
  pacient = {
    nombre: '',
    apellido: '',
    genero: '',
    fecha_nacimiento: '',
    telefono: '',
    direccion: '',
    email: '',
    edad: '',
    enfermedad: '',
    caracteristicas: ''
  };

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private alertService: AlertService, private sharedService: SharedService) {
    // Definición del formulario reactivo
    this.pacienteForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      genero: ['', Validators.required],
      matricula: ['', Validators.required],
      caracteristicas: ['', Validators.required],
      enfermedad: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(0)]],
      confirmacion: [false, Validators.requiredTrue]
    });
  }

  ngOnInit(): void {
    this.fetchUsers();
    this.sharedService.showRegisterButton$.subscribe(show => {
      this.showTableMaster = show;
    });
  }

  // Método para manejar el envío del formulario
  onSubmit() {
    this.submitted = true;

    // Verificar si el formulario es inválido
    if (this.pacienteForm.invalid) {
      alert('Por favor, completa todos los campos requeridos.');
      return;
    }
  }

  fetchUsers() {
    this.apiService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
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
}

