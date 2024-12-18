import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/Service/alert.service';
import { ApiService } from 'src/app/Service/api.service';
import { UserService } from 'src/app/Service/user.service';
import { Cita } from 'src/app/Shared/Data';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent {
  citas: Cita[] = [];
  patients: any[] = [];
    nuevaCita: any = {
        registration_number: '',
        doctor_id: 0,
        fecha: '',
        hora: '',
  };

  dateDay = new Date();
  horaActual: Date = new Date();
  estado: boolean = true;

  constructor(private router: Router, private citasService: ApiService, private userService: UserService, private alert: AlertService){
    this.obtenerCitas();
    this.obtenerPacientes(userService.getDoctorId()); // Cambia el ID del doctor según sea necesario   
  }

  ngOnInit(): void {
    this.obtenerCitas();
    setInterval(() => {
      this.horaActual = new Date();
    }, 1000);
  }

  obtenerCitas() {
    this.citasService.obtenerCitas(this.userService.getDoctorId()).subscribe((data) => {
        this.citas = data;
    });
  }
  obtenerPacientes(doctorId: number) {
      this.citasService.obtenerPacientes(doctorId).subscribe((data) => {
          this.patients = data;
      });
  }
  guardarCita(citaForm: any) {
    if (citaForm.invalid) {
      console.log('Formulario inválido, revise los campos');
      Object.values(citaForm.controls).forEach((control: any) => {
        if (control.markAsTouched) {
          control.markAsTouched(); // Marca los controles como tocados
        }
      });
      return; // Detiene la ejecución si hay campos inválidos
    }
    const doctor = this.userService.getDoctorId();
    // Si el formulario es válido, guardar la cita
    // Añadir el doctorId a los datos de la cita
  const citaConDoctorId = {
    ...this.nuevaCita, // Propiedades de la cita como ya las tienes
    doctor_id: doctor  // Incluir el ID del doctor
  };
  console.log(doctor);
    this.citasService.crearCita(citaConDoctorId).subscribe({
      next: () => {
        
        this.obtenerCitas();
        this.nuevaCita = { registration_number: '', fecha: '', hora: '' };
        citaForm.reset();
        this.alert.success('Guardado Exitoso', 'Cita guardado con exito');
      },
      error: (err) => {
        console.log(citaConDoctorId);
        console.error('Error al guardar la cita:', err);
      },
    });
  }

  // Eliminar cita manualmente
  eliminarCita(index: number) {
    this.alert.confirm('¿Estás seguro de que quieres eliminar esta cita?', 'Confirmación de eliminación')
      .then((confirmed) => {
        if (confirmed) {
          // Si el usuario confirma, proceder con la eliminación
          this.citasService.eliminarCita(index).subscribe({
            next: () => {
              this.citas.splice(index, 1); // Eliminar cita del arreglo
              this.obtenerCitas();
              this.cambioEstado();
              this.alert.success('Cita eliminada correctamente', 'Éxito');
            },
            error: (err) => {
              this.alert.error('Hubo un error al eliminar la cita.', 'Error');
            },
          });
        }
      });
  }
  // Actualizar citas automáticamente al pasar la hora
  actualizarCitasAutomaticas() {
    setInterval(() => {
      const now = new Date();
      this.citas = this.citas.filter((cita) => {
        const citaFechaHora = new Date(`${cita.fecha}T${cita.hora}`);
        return citaFechaHora > now; // Mantener solo citas futuras
      });
    }, 60000); // Actualizar cada minuto
  }

  cambioEstado(){
      this.estado = !this.estado;
  }
  
}
