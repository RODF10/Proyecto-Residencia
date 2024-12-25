import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/Service/alert.service';
import { ApiService } from 'src/app/Service/api.service';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-register-patient',
  templateUrl: './register-patient.component.html',
  styleUrls: ['./register-patient.component.scss']
})
export class RegisterPatientComponent implements OnInit, OnDestroy{
  /* REGISTRO DE PACIENTE */
  pacienteForm: FormGroup;
  pacientes: any[] = []; // Array para almacenar los pacientes registrados
  submitted = false;
  cuidadorForm!: FormGroup;

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

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private alertService: AlertService, private userService: UserService, private router: Router) {
    // Definición del formulario reactivo
    this.pacienteForm = this.formBuilder.group({
      matricula: ['', Validators.required], //Matricula
      nombre: ['', Validators.required], //Nombre
      apellido: ['', Validators.required], //Apellido
      genero: ['', Validators.required], //Genero
      fecha_nacimiento: ['', [Validators.required]], //Fecha Nacimiento
      direccion: ['', Validators.required], // Direccion
      historialMedico: ['', Validators.required], //Historial Medico
      alergias: ['', Validators.required], // Alergias que tiene
      caracteristicas: ['', Validators.required], // Descripcion
      confirmacion: [false, Validators.requiredTrue]
    });

    this.cuidadorForm = formBuilder.group({
      cuidador_name: [''],
      cuidador_lastname: [''],
      cuidador_phone: ['', [Validators.maxLength(10), Validators.pattern(/^\d+$/), Validators.minLength(10)]],
      cuidador_email: ['', [Validators.email]],
      cuidador_address: ['']
    });
  }

  ngOnInit(): void {
      this.doctor.id = this.userService.getDoctorId();
      this.doctor.name = this.userService.getDoctorName();
      console.log('Nombre: '+this.doctor.name +' ID: '+this.doctor.id)
      
  }

  ngOnDestroy(): void {
      console.log('Componente destruido manualmente');
  }

  // Método para manejar el envío del formulario
  onSubmit() {
    this.submitted = true;

    // Generar la fecha y hora actual en el formato [YYYY-MM-DD - HH:mm:ss]
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
    const formattedTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    const lastConsultation = `${formattedDate} - ${formattedTime}`;

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
      gender: this.pacienteForm.value.genero,
      birth_date: this.pacienteForm.value.fecha_nacimiento,
      address: this.pacienteForm.value.direccion,
      medical_history: this.pacienteForm.value.historialMedico,
      allergies: this.pacienteForm.value.alergias,
      description: this.pacienteForm.value.caracteristicas,
      last_consultation: lastConsultation, // Fecha y hora de la consulta
      doctor_id: this.doctor.id // Suponiendo que el objeto `doctor` contiene los datos del doctor actual
    };

    this.apiService.crearPaciente(pacienteData).subscribe({
      next: (response) => {
        this.alertService.success('Paciente registrado correctamente.', 'Éxito');
        console.log('Respuesta del servidor:', response);
        const cuidador = this.cuidadorForm.value;
        cuidador.patient_id = response.registration_number; // Asociar cuidador con paciente
        this.apiService.newCuidador(cuidador).subscribe({
          next: () =>{
            //this.alertService.success('Cuidador registrado correctamente.', 'Éxito');
            this.cuidadorForm.reset(); // Limpiar ambos formularios
          }, error: (err) => {
            this.alertService.error('No se pudo registrar al cuidador.', 'Error');
          }
        });
        // Reiniciar el formulario
        this.pacienteForm.reset();
        this.submitted = false;
        this.router.navigate(['home/list-person']);
      },
      error: (error) => {
        if (error.status == 422 && error.error?.message == 'El número de registro ya está en uso.') {
          this.alertService.warning('El número de IMSS ya está en otro paciente.', 'Duplicate IMSS');
        } else {
          this.alertService.error('No se pudo registrar el paciente. Inténtelo de nuevo.', 'Error');
        }
      }
    });

    console.log(lastConsultation);
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
