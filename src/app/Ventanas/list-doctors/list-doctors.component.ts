import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/Service/alert.service';
import { ApiService } from 'src/app/Service/api.service';
import { SharedService } from 'src/app/Service/shared.service';
import { UserService } from 'src/app/Service/user.service';
import Swal from 'sweetalert2';

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
  passwordForm!: FormGroup;
  name_doctor = '';
  id_doctor: number = 0;
  mostrar: boolean = true;

  constructor(private apiService: ApiService, private alertService: AlertService, private sharedService: SharedService, private router: Router, private fb: FormBuilder, private userID: UserService){
    this.passwordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8), noSpacesValidator()]],
    });
  }

  ngOnInit(): void {
    this.cargarDoctores();
      this.sharedService.showRegisterButton$.subscribe(show => {
        this.showTableMaster = show;
      });      
      console.log(this.userID.getDoctorId());
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
  
  actualizarUsuario(id: number, name: string): void {
    console.log(`Actualizar ${name} con ID: ${id}`);
    this.name_doctor = name;
    this.id_doctor = id;
    this.vistaPassword(true);
    // Agrega aquí la lógica para actualizar el usuario
  }
  cargarDoctores() {
    this.apiService.getUsers().subscribe({
      next: (data) => {
        // Calcula la edad de cada usuario antes de asignar los datos
        this.users = data.map((user: any) => ({
          ...user,
          edad: this.calcularEdad(user.date) // Calcula y agrega el campo 'edad'
        }));
      },
      error: (error) => {
        console.error('Error al cargar los doctores:', error);
      }
    });
  }
  register(){
    this.router.navigate(['home/doctors-register']);
  }
  // Método para calcular la edad
  calcularEdad(fechaNacimiento: string): number {
    const birthDate = new Date(fechaNacimiento); // Convierte la fecha de nacimiento a un objeto Date
    const today = new Date(); // Obtén la fecha actual

    let edad = today.getFullYear() - birthDate.getFullYear(); // Diferencia de años
    const mes = today.getMonth() - birthDate.getMonth(); // Diferencia de meses

    // Ajusta si el mes actual es menor al mes de nacimiento, o si están en el mismo mes pero el día actual es menor
    if (mes < 0 || (mes === 0 && today.getDate() < birthDate.getDate())) {
      edad--;
    }

    return edad;
  }
  async changePassword(){
    const idD = this.userID.getDoctorId();
    if (this.passwordForm.valid) {
      const passwordData = {
        password: this.passwordForm.get('password')?.value
      }
      console.log(passwordData)
      const isPasswordConfirmed = await this.alertService.confirmPasswordChange(idD);
      if (isPasswordConfirmed) {
        this.apiService.updatePasswordD(this.id_doctor, passwordData).subscribe({
          next: () => {
            this.alertService.success('Contraseña actualizada correctamente.', 'Éxito');
            this.vistaPassword(false);
          },
          error: (err) => {
            console.error('Error al actualizar la contraseña:', err);
            this.alertService.error('No se pudo actualizar la contraseña.', 'Error');
          }
        });
      } else {
        this.alertService.warning('Error al actualizar la contraseña, intente de nuevo', 'Update Error');
      }  
    }
  }
  getPasswordErrorMessage() {
    const passwordControl = this.passwordForm.get('password');
    if (passwordControl?.hasError('required')) {
      return 'La contraseña es obligatoria.';
    }
    if (passwordControl?.hasError('minlength')) {
      return 'La contraseña debe tener al menos 8 caracteres.';
    }
    if(passwordControl?.hasError('noSpaces')){
      return 'La contraseña no debe contener espacios.';
    }
    return '';
  }
  vistaPassword(ent: boolean){
    this.mostrar = !this.mostrar;
    if(!ent){
      this.name_doctor = '';
      this.id_doctor = 0;
      this.passwordForm.reset();
    }
  }
}

// Validador para detectar espacios en blanco
export function noSpacesValidator(): ValidatorFn {
  return (control: AbstractControl): Validators | null => {
    const hasSpaces = /\s/.test(control.value); // Verifica si hay espacios
    return hasSpaces ? { noSpaces: true } : null; // Retorna un error si hay espacios
  };
}
