import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { AlertService } from 'src/app/Service/alert.service';
import { ApiService } from 'src/app/Service/api.service';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-register-patient',
  templateUrl: './register-patient.component.html',
  styleUrls: ['./register-patient.component.scss']
})
export class RegisterPatientComponent implements OnInit{
  /* REGISTRO DE PACIENTE */
  pacienteForm: FormGroup;
  pacientes: any[] = []; // Array para almacenar los pacientes registrados
  submitted = false;

  doctor = {
    id: 0, // Este sería el ID del doctor autenticado
    name: 'Undefinied'
  };
  

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

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private alertService: AlertService, private userService: UserService) {
    // Definición del formulario reactivo
    this.pacienteForm = this.formBuilder.group({
      matricula: ['', Validators.required], //Matricula
      nombre: ['', Validators.required], //Nombre
      apellido: ['', Validators.required], //Apellido
      genero: ['', Validators.required], //Genero
      fecha_nacimiento: ['', [Validators.required]], //Fecha Nacimiento
      telefono: ['', [ //Telefono de Emergencia
          Validators.required,
          Validators.pattern(/^[0-9]*$/), // Solo números
          exactLength(10)      // Máximo de 10 dígitos
        ]
      ],
      direccion: ['', Validators.required], // Direccion
      email: ['', [Validators.required, Validators.email]], //Correo de Emergencia
      edad: ['', [Validators.required, Validators.min(20)]], //Edad
      historialMedico: ['', Validators.required], //Historial Medico
      alergias: ['', Validators.required], // Alergias que tiene
      caracteristicas: ['', Validators.required], // Descripcion
      confirmacion: [false, Validators.requiredTrue]
    });
  }

  ngOnInit(): void {
      this.doctor.id = this.userService.getDoctorId();
      this.doctor.name = this.userService.getDoctorName();
      console.log('Nombre: '+this.doctor.name +' ID: '+this.doctor.id)
      
  }

  // Método para manejar el envío del formulario
  onSubmit() {
    this.submitted = true;

    // Validación del formulario
    if (this.pacienteForm.invalid) {
      this.alertService.warning('Por favor, completa todos los campos requeridos.', 'Formulario Incompleto');
      console.log(this.pacienteForm.valid);
      return;
    }

    // Obtener datos del formulario y añadir el ID del doctor
    const pacienteData = {
      registration_number: this.pacienteForm.value.matricula,
      first_name: this.pacienteForm.value.nombre,
      last_name: this.pacienteForm.value.apellido,
      age: this.pacienteForm.value.edad,
      gender: this.pacienteForm.value.genero,
      birth_date: this.pacienteForm.value.fecha_nacimiento,
      emergency_contact: this.pacienteForm.value.telefono,
      emergency_email: this.pacienteForm.value.email,
      address: this.pacienteForm.value.direccion,
      medical_history: this.pacienteForm.value.historialMedico,
      allergies: this.pacienteForm.value.alergias,
      description: this.pacienteForm.value.caracteristicas,
      doctor_id: this.doctor.id // Suponiendo que el objeto `doctor` contiene los datos del doctor actual
    };

    this.apiService.crearPaciente(pacienteData).subscribe({
      next: (response) => {
        this.alertService.success('Paciente registrado correctamente.', 'Éxito');
        console.log('Respuesta del servidor:', response);

        // Reiniciar el formulario
        this.pacienteForm.reset();
        this.submitted = false;
      },
      error: (error) => {
        this.alertService.error('Ocurrió un error al registrar el paciente. Por favor, inténtelo de nuevo.', 'Error');
        console.error('Error al registrar paciente:', error);
      }
    });
  }
}

// Validador personalizado TELEFONO
export function exactLength(length: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value && value.length !== length) {
      return { exactLength: { requiredLength: length, actualLength: value.length } };
    }
    return null;
  };
}
