import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

interface Paciente {
  nombre?: string;
  apellido?: string;
  edad?: number;
  caracteristicas?: string;
  enfermedad?: string;
  genero?: string;
  imagenUrl?: string;
  matricula?: number;
}

@Component({
  selector: 'app-list-person',
  templateUrl: './list-person.component.html',
  styleUrls: ['./list-person.component.scss']
})
export class ListPersonComponent {
  paciente: Paciente = {
    nombre: 'María García',
    apellido: 'Cauich',
    edad: 30,
    caracteristicas: 'Paciente de cuidados intensivos',
    genero: 'Femenino',
    enfermedad: 'COVID-19',
    imagenUrl: 'https://img.freepik.com/vector-gratis/doctor-examinando-paciente-clinica-ilustrada_23-2148856559.jpg',
    matricula: 12345
  };

  pacienteForm: FormGroup = this.formBuilder.group({});
  submitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router) {
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

  onSubmit() {
    this.submitted = true;

    if (this.pacienteForm.invalid) {
      return;
    }

    // Aquí puedes manejar los datos del formulario
    alert('Formulario enviado exitosamente!');
    console.log(this.pacienteForm.value);
  }
}
