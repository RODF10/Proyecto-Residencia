import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/Service/api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-list-person',
  templateUrl: './list-person.component.html',
  styleUrls: ['./list-person.component.scss']
})
export class ListPersonComponent {
  pacienteForm: FormGroup;
  submitted = false;
  pacientes: any[] = []; // Array para almacenar los pacientes registrados

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

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {
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

  // Método para manejar el envío del formulario
  onSubmit() {
    this.submitted = true;

    // Verificar si el formulario es inválido
    if (this.pacienteForm.invalid) {
      alert('Por favor, completa todos los campos requeridos.');
      return;
    }

    // Llamar al método para registrar el paciente
    this.registro();
  }

  // Método para registrar al paciente
  registro() {
    this.apiService.registerPatient(this.pacienteForm.value).subscribe(
      (response: any) => {  // Aquí puedes definir un tipo específico si es necesario
        console.log('Registro Exitoso', response);
        alert('Registro exitoso');

        // Agregar el paciente al array de pacientes
        this.pacientes.push({ ...this.pacient });

        // Limpiar el formulario y el objeto pacient
        this.pacienteForm.reset();
        this.submitted = false;

        // Cerrar el modal si es necesario
        // Si tienes algún código para cerrar el modal, añádelo aquí
      },
      (error: HttpErrorResponse) => {
        console.error('Error en el Registro', error);
        alert('Error en el registro');
      }
    );
  }
}

