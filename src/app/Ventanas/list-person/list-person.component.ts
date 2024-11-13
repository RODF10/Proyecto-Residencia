import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PacienteService } from 'src/app/Service/paciente.service';

@Component({
  selector: 'app-list-person',
  templateUrl: './list-person.component.html',
  styleUrls: ['./list-person.component.scss']
})
export class ListPersonComponent implements OnInit {
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
    private pacienteService: PacienteService
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

  ngOnInit(): void {
    this.obtenerPacientes();
  }

  // Método para obtener la lista de pacientes
  obtenerPacientes() {
    this.pacienteService.getPacientes().subscribe(
      (data) => {
        this.pacientes = data;
      },
      (error) => {
        console.error('Error al obtener pacientes:', error);
      }
    );
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
    this.pacienteService.createPaciente(this.pacienteForm.value).subscribe(
      (response) => {
        console.log('Registro Exitoso', response);
        alert('Registro exitoso');

        // Agregar el paciente al array de pacientes y refrescar la lista
        this.obtenerPacientes();

        // Limpiar el formulario y el objeto pacient
        this.pacienteForm.reset();
        this.submitted = false;
      },
      (error) => {
        console.error('Error en el Registro', error);
        alert('Error en el registro del paciente');
      }
    );
  }
}
