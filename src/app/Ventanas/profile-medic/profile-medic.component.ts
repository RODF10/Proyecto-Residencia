import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { NgxImageCompressService } from 'ngx-image-compress';
import { AlertService } from 'src/app/Service/alert.service';
import { ApiService } from 'src/app/Service/api.service';
import { LoadJSService } from 'src/app/Service/load-js.service';
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
  public status: boolean= true; /// false: Add   true:  Edit
  public preview: string = ""
  public base64Image: string | null = null; // Imagen en Base64
  public imageUrl: string | null = null; // URL de la imagen
  //Mostrar por defecto en caso de mo conectar al servidor
  nombre: string = 'Eduardo Manuel';
  apellido: string = 'Miller Martínez';
  cedula: string = '123456789';
  profesion: string = 'Ingeniero de Software';
  fecha?: string = '21/Agosto/2004';
  edad: number | null = null;
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
  capImage: boolean = false;

  constructor(private userService: UserService, private apiService: ApiService, private datePipe: DatePipe, private fb: FormBuilder, private alertService: AlertService, private Load: LoadJSService, private imageCompress: NgxImageCompressService) {
    Load.Carga(["ValidImage"]);
  }

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
      date: ['', [Validators.required]],
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
              this.cargarFormDoctor(doctor);

              this.nombre = doctor.nombre;
              this.apellido = doctor.apellido;
              this.fechaForm = doctor.date;
              this.genero = doctor.genero;
              this.cedula = doctor.cedula;
              this.profesion = doctor.profesion;
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
              if(doctor.image != null){
                this.status = false;
              } else {
                this.status = true;
              }
              this.apiService.getUpdateImage(doctor.imagen);
              //window.alert('Error Al Obtener la Contraseña del  Servidor');
          } else {
              console.error('Error: Datos del doctor no encontrados.');
          }
      },
      (error) => {
          console.error('Error al obtener los datos del doctor:', error);
      }
     );

     this.apiService.getUpdateImage(this.imagen);
  }
  // Actualizar Imagen
  
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
      this.cedulaDuplicada = false;
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
          this.mostrar = !this.mostrar;
          this.cargarDatosPerfil(id);
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
      this.alertService.warning('Formulario incompleto, favor de llenar los datos', 'Formulario inválido');
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

  cargarFormDoctor(doctor: any){
    // Llenar datos del formulario ProfileForm
    this.profileForm.patchValue({
      nombre: doctor.nombre,
      apellido: doctor.apellido,
      cedula: doctor.cedula,
      profesion: doctor.profesion,
      date: doctor.date,
      genero: doctor.genero,
      telefono: doctor.telefono,
      direccion: doctor.direccion,
      imagen: doctor.imagen || 'assets/Imagenes/default-profile.png',
    });
    this.edad = this.getEdad(doctor.date);
  }
  //Obtener edad por fecha de nacimiento
  getEdad(birthDate: string): number {
    const birth = new Date(birthDate); // Convierte la fecha de nacimiento a un objeto Date
    const today = new Date(); // Obtén la fecha actual

    let edad = today.getFullYear() - birth.getFullYear(); // Diferencia de años
    const mes = today.getMonth() - birth.getMonth(); // Diferencia de meses

    // Ajusta si el mes actual es menor al mes de nacimiento, o si están en el mismo mes pero el día actual es menor
    if (mes < 0 || (mes === 0 && today.getDate() < birth.getDate())) {
      edad--;
    }

    return edad;
  }

  saveImage(){
    const image = this.base64Image ?? this.imageUrl;
    if(image != null){
      this.apiEnvio(image);
      this.alertService.success('Imagen Guardada con exito', 'Update Image');
    }
  }
  deleteImage(){
    this.alertService.confirm('¿Estás seguro de que deseas eliminar esta imagen?', 'Eliminar Imagen', 'Sí', 'No')
    .then((confirmed) => {
      if (confirmed) {
        // Si el usuario confirma, procedemos a enviar la solicitud para eliminar la imagen
        this.apiEnvio(null);
        this.alertService.success('Imagen eliminada con exito', 'Delete Image');
      } else {
        // Si el usuario cancela, no hacemos nada
        console.log('Eliminación cancelada');
      }
    });
  }
  cancelImage(ent: boolean){
    this.capImage = !this.capImage;
    if(!ent){
      if(this.imageUrl){
        this.imageUrl = null;
        this.preview = this.imagen;
      } else {
        this.preview = this.imagen;
      }
    }
  }

  apiEnvio(image: string | null){
    const imagen = image;
    const id = this.userService.getDoctorId();
    this.apiService.updateImage(id, imagen).subscribe(
      (response) => {
        console.log('Mensaje Enviado');
        this.cargarDatosPerfil(id);
      }, (error) => {
        console.error('Error imagen: ' + error);
      }
    );
    
    this.capImage = !this.capImage;
  }

  capFile(event: any){
    const fileCap = event.target.files[0];
    const targetSizeInBytes = 614400;
    this.checkSize(fileCap, targetSizeInBytes); /// Mandamos el archivo (imagen) a comprimirlo....
    this.extraerBase64(fileCap).then((image: any) => {
      this.preview = image.base;
      this.base64Image = image.base;
      //console.log(image);
    })
    //this.archivo.push(fileCap);
    /*console.log(event.target.files[0].name);
    this.nombre = event.targ.files[0].name;*/
  }

  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
      try{
        //const unsafeImg = window.URL.createObjectURL($event);
        //const image = this.santizer.bypassSecurityTrustUrl(unsafeImg);
        const reader = new FileReader();
        reader.readAsDataURL($event);
        reader.onload = () => {
          resolve({
            base: reader.result
          });
        };
        reader.onerror = error => {
          resolve({
              base: null
          });
        };
        return reader;
      } catch(e){
          return null;
      }
  })

  checkSize(file: File, targetSizeInBytes: number) { ///checamos el tamaño de la imágen
    console.log(file);
    if (file.size > targetSizeInBytes) {
      if (file.size > 2000000){
        console.log("mayor  1ue A")
        this.compressedImage(file, 50); 
      } else {
        console.log("maenor qur a")
        this.compressedImage(file, 600); 
      }
       /// si es más que 600x600 lo comprimimos
    } else {
      this.extraerBase64(file).then((image: any) => {
        console.log("saltamos")
        //this.newProducto.image = image.base; // sino simplemente lo codificamos en base 64
      })
    }
  }
  compressedImage(file: File, cali: number){ /// Comprimimos la imágen
    const reader = new FileReader();

  reader.onload = () => {
    const base64Image = reader.result as string;
    this.imageCompress.compressFile(base64Image, -1, cali, cali).then((compressedImage) => { //dimensiones de salida
      //this.newProducto.image= compressedImage;
      console.log("andamos ")
      //console.log(compressedImage)
    });
  };

  reader.readAsDataURL(file);
  }
  // Manejar URL de la imagen
  loadFromURL(event: Event): void {
    const input = event.target as HTMLInputElement;
    const url = input.value;
    if (url) {
      this.preview = url; // Mantener funcionalidad actual
      this.imageUrl = url;

      // Llamar al método para descargar y convertir a Base64
      //this.downloadImageAsBase64(url);
    }
  }
  // Manejar arrastrar y soltar
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const dropzone = document.querySelector('.cargarImagen')!;
    dropzone.classList.add('dragover');
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const dropzone = document.querySelector('.cargarImagen')!;
    dropzone.classList.remove('dragover');

    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      const validImageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/x-icon'];
      if(!validImageTypes.includes(file.type)){
        this.alertService.warning('Por favor, arrastra una imagen válida (jpg, png, webp, gif, ico)', 'Formato no Compatible');
        return;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.preview = e.target.result;
        //this.status = true;

        // Borrar el campo de URL si existe
        const urlInput = document.querySelector('.image-url') as HTMLInputElement;
        if (urlInput) {
          console.log('Encontrado')
          urlInput.value = ''; // Limpiar el valor del campo de texto
        } else {
          console.error('Error al encontrarlo')
        }
      };
      reader.readAsDataURL(file);
    }
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }
  /* DESCARGAR IMAGEN PARA BASE DE DATOS */
  downloadImageAsBase64(url: string): void {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('No se pudo descargar la imagen.');
        }
        return response.blob(); // Obtener la imagen como blob
      })
      .then(blob => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64data = reader.result as string;
          console.log('Imagen en Base64:', base64data);
          // Aquí puedes almacenar el Base64 en tu base de datos o variable
          this.preview = base64data; // Actualizar previsualización si lo deseas
          //this.status = true;
        };
        reader.readAsDataURL(blob); // Convertir blob a Base64
      })
      .catch(error => {
        console.error('Error al descargar la imagen:', error);
      });
  }
}

// Validador para detectar espacios en blanco
export function noSpacesValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const hasSpaces = /\s/.test(control.value); // Verifica si hay espacios
    return hasSpaces ? { noSpaces: true } : null; // Retorna un error si hay espacios
  };
}
