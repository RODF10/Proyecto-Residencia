import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-patient',
  templateUrl: './register-patient.component.html',
  styleUrls: ['./register-patient.component.scss']
})
export class RegisterPatientComponent {
  /* RESGITRO DE PACIENTE */
  pacienteForm: FormGroup;
  pacientes: any[] = []; // Array para almacenar los pacientes registrados
  submitted = false;
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

  constructor(private formBuilder: FormBuilder){
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

}
