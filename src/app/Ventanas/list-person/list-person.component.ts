import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/Service/api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-list-person',
  templateUrl: './list-person.component.html',
  styleUrls: ['./list-person.component.scss']
})
export class ListPersonComponent implements OnInit{
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

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) {
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
}

