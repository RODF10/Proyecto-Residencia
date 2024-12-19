import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AlertService } from 'src/app/Service/alert.service';
import { ApiService } from 'src/app/Service/api.service';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-profile-medic',
  templateUrl: './profile-medic.component.html',
  styleUrls: ['./profile-medic.component.scss'],
  providers: [DatePipe]  // Proveer DatePipe en el componente
})

export class ProfileMedicComponent implements OnInit{
  //Datos del Docto
  doctorData : any; //Recibe los datos del servido
  //Mostrar por defecto en caso de mo conectar al servidor
  nombre: string = 'Eduardo Manuel';
  apellido: string = 'Miller Martínez';
  cedula: string = '123456789';
  profesion: string = 'Ingeniero de Software';
  fecha?: string = '21/Agosto/2004';
  edad: number = 30;
  genero: string = 'Masculino';
  correo: string = 'usuario@ejemplo.com';
  telefono: string = '123-456-7890';
  direccion: string = '123 Calle Principal, Ciudad, País';
  imagen: string = 'assets/Imagenes/defaul-profile.png';
  password: string = 'Error Server getPasssword!';
  mostrarPassword = false;
  fechaForm = '????/??/??';
  cursor = 'No Disponible';
  // Condicion de ventanas a mostrar
  mostrar: boolean = true; //Vista alterna entre Datos y Actualizacion
  pass: boolean = false; // Vista de Password Change

  //Registro de la actualizacion
  profileForm!: FormGroup;
  //Formulario Password
  changePasswordForm!: FormGroup;
  //mostrarPassword: boolean = false;
  mostrarConfirmPassword: boolean = false;
  mostrarCurrentPassword: boolean = false;
  cedulaDuplicada: boolean = false;

  constructor(private userService: UserService, private apiService: ApiService, private datePipe: DatePipe, private fb: FormBuilder, private alertService: AlertService) {}

  ngOnInit(): void {
     // Obtener el ID del doctor desde el ApiService
     const doctorId = this.userService.getDoctorId();
     if(doctorId){
      this.cargarDatosPerfil(doctorId);
     }

     //Datos del Formulario (Update)
     this.profileForm = this.fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      cedula: ['', [Validators.required]],
      profesion: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]*$')]],
      direccion: ['', [Validators.required]],
    });

    // Updte Passowrd
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      correo: ['', [Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), noSpacesValidator()]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    }, { validators: this.passwordsMatchValidator });
  }

  cargarDatosPerfil(id: number){
    // Llamar al servicio para obtener los datos del doctor
    this.apiService.getDoctorId(id).subscribe(
      (response: any) => {
          if (response.success) {
              const doctor = response.data;
              // Llenar datos del formulario ProfileForm
              this.profileForm.patchValue({
                nombre: doctor.nombre,
                apellido: doctor.apellido,
                cedula: doctor.cedula,
                profesion: doctor.profesion,
                fecha: doctor.date,
                genero: doctor.genero,
                telefono: doctor.telefono,
                direccion: doctor.direccion,
                imagen: doctor.imagen || 'assets/Imagenes/default-profile.png',
              });

              this.nombre = doctor.nombre;
              this.apellido = doctor.apellido;
              this.fechaForm = doctor.date;
              this.genero = doctor.genero;
              this.cedula = doctor.cedula;
              this.profesion = doctor.profesion;
              this.edad = doctor.edad;
              this.correo = doctor.email;
              this.telefono = doctor.telefono;
              //this.password = doctor.password;
              this.direccion = doctor.direccion;
              this.imagen = doctor.imagen ? doctor.imagen : 'assets/Imagenes/default-profile.png';
              // Cambiar formato de la fecha
              if (doctor.date) {
                const formattedDate = this.datePipe.transform(doctor.date, 'dd/MMMM/yyyy'); // Cambia el formato a 'yyyy/MMMM/dd'
                this.fecha = formattedDate?.replace('M', this.getMonthName(new Date(doctor.date).getMonth())); // Reemplaza el número del mes con el nombre
              }
              console.log(doctor, id);
              //window.alert('Error Al Obtener la Contraseña del  Servidor');
          } else {
              console.error('Error: Datos del doctor no encontrados.');
          }
      },
      (error) => {
          console.error('Error al obtener los datos del doctor:', error);
      }
     );     
  }
  //Visibilidad de la Contraseña
  togglePasswordVisibility(): void {
    this.mostrarPassword = !this.mostrarPassword;
  }
  toggleCurrentPasswordVisibility() {
    this.mostrarCurrentPassword = !this.mostrarCurrentPassword;
  }
  toggleConfirmPasswordVisibility(): void {
    this.mostrarConfirmPassword = !this.mostrarConfirmPassword;
  }
  
  selectChanged(select: number) {
    this.pass = !this.pass;
    console.log(this.profileForm.valid)
    if(select == 2){
      this.changePasswordForm.reset();
    }
  }

  seleccionPerfil(selec: number){
    this.mostrar = !this.mostrar; // Alternar entre los divs
    if(selec == 2){
      this.profileForm.reset();
      this.cargarDatosPerfil(this.userService.getDoctorId());
    }
  }

  // Función para obtener el nombre del mes
  getMonthName(monthIndex: number): string {
    const months = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    return months[monthIndex];
  }
  onSubmitForm(): void {
    if (this.profileForm.valid) {
      // Aquí puedes enviar los datos a tu API
      const cedula = this.profileForm.get('cedula')?.value;
      const id = this.userService.getDoctorId();
      const profileData = this.profileForm.value;
      this.apiService.updateDoctorProfile(id, profileData).subscribe(
        (response) => { 
          this.cedulaDuplicada = false;
          this.alertService.success('Perfil Actualziado con Éxito', 'Information Update');
        }, (error) => {
          if (error.status == 409) {
            // Cédula duplicada
            this.cedulaDuplicada = true;
            this.alertService.warning('La cédula ya está registrada', 'Cédula duplicada');
          } else {
            console.error('Error al actualizar el perfil:', error);
            this.alertService.error('Error al actualizar el perfil', 'Error');
          }
        }
      );
      console.log('Formulario Enviado / ', profileData);
    } else {
      console.log('Formulario inválido');
    }
  }
  onSubmitPassword(): void{
    const idDoc = this.userService.getDoctorId();
    if(this.changePasswordForm.valid){
      const formValues = this.changePasswordForm.value;
      const currentPassword = formValues.currentPassword;
      const correo = formValues.correo || this.correo;
      const nuevaPassword = formValues.password;

      // Preparar los datos a enviar al backend
      const payload = {
        correo: correo,
        currentPassword: currentPassword,
        password: nuevaPassword
      };

      // Llamar al servicio para cambiar la contraseña
      this.apiService.changePassword(payload).subscribe(
        (response) => {
          console.log('Contraseña actualizada con éxito:', response);
          console.log(payload);
          this.alertService.success('Cambio de contraseña exitoso', 'Successfuly Password');
          this.pass = !this.pass;
          this.cargarDatosPerfil(idDoc);
          this.changePasswordForm.reset();
        },
        (error) => {
          // Aquí puedes manejar errores, como mostrar un mensaje al usuario
          console.error('Error al actualizar la contraseña:', error);
          if(error?.status == 401){
            this.alertService.error('Error al cambiar la contraseña, verifique su contraseña actual', 'Contraseña Invalida');
            return;
          }
          this.alertService.disconnected('Erro de Conexión al servidor', 'No se conecto al servidor');
          
        }
      );
    } else {
      // Marcar todos los campos como tocados para mostrar errores
      this.changePasswordForm.markAllAsTouched();
    }

  }
  //Metodo para validar password coicidan
  passwordsMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    return password == confirmPassword ? null : { passwordsMismatch: true };
  }
  // Obtener mensaje de error para el correo
  getEmailErrorMessage() {
    const correoControl = this.changePasswordForm.get('correo');
    if (correoControl?.hasError('email')) {
      return 'Por favor, ingresa un correo válido.';
    }
    return '';
  }
  // Obtener mensaje de error para la contraseña
  getPasswordErrorMessage() {
    const passwordControl = this.changePasswordForm.get('password');
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
  // Obtener mensaje de error para confirmar contraseña
  getConfirmPasswordErrorMessage() {
    const confirmPasswordControl = this.changePasswordForm.get('confirmPassword');
    if (confirmPasswordControl?.hasError('required')) {
      return 'Confirmar contraseña es obligatorio.';
    }
    if (confirmPasswordControl?.hasError('minlength')) {
      return 'La confirmación de contraseña debe tener al menos 8 caracteres.';
    }
    if (this.changePasswordForm.hasError('passwordsMismatch')) {
      return 'Las contraseñas no coinciden.';
    }
    return '';
  }
  getCurrentPasswordErrorMessage() {
    if (this.changePasswordForm.get('currentPassword')?.hasError('required')) {
      return 'La contraseña actual es requerida.';
    }
    return '';
  }
}

// Validador para detectar espacios en blanco
export function noSpacesValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const hasSpaces = /\s/.test(control.value); // Verifica si hay espacios
    return hasSpaces ? { noSpaces: true } : null; // Retorna un error si hay espacios
  };
}
