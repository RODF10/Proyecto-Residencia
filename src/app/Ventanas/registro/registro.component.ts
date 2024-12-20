import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/Service/alert.service';
import { ApiService } from 'src/app/Service/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit{
  registerForm!: FormGroup;
  submitted = false;
  errors: any = {}; // Almacena mensajes de error personalizados
  selectedImage!: File | null; // Almacena la imagen seleccionada
  

   constructor(private fb: FormBuilder,private  doctorsApi: ApiService, private router: Router, private alert: AlertService){}

   ngOnInit(): void {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      cedula: ['', Validators.required],
      profesion: ['', Validators.required],
      date: ['', Validators.required],
      genero: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), noSpacesValidator()]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      direccion: ['', Validators.required],
      imagen: [''], // Imagen es opcional
    });
   }

   
   registro(){
    if (this.registerForm.invalid) {
      console.log('Formulario no válido');
      this.alert.warning('No deje campos vacios, por favor de llenarlo', 'Campos Vacios');
      return;
    }

    const formData = new FormData();
    Object.keys(this.registerForm.value).forEach((key) => {
      if (key !== 'imagen') {
        formData.append(key, this.registerForm.get(key)?.value || '');
      }
    });

    // Si se seleccionó una imagen, añadirla al FormData
    if (this.selectedImage) {
      formData.append('imagen', this.selectedImage);
    }


    if (this.registerForm.valid) {
      this.doctorsApi.registerDoctor(formData).subscribe(
        (response) => {
          console.log('Doctor registrado:', response);
          this.alert.success('Registro de usuario Exitoso', 'Succesfuly Register');
          this.router.navigate(['home/list-doctors']);
        },
        (error) => {
          console.error('Error al registrar doctor:', error);
          this.alert.error('Error al registrar al Usuario', 'Failed Register');
        }
      );
    } else {
      console.log('Formulario no válido');
      this.alert.warning('Error de Formulatio', 'Register Failed');
    }
   }
   onImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
    }
  }
  getPasswordErrorMessage() {
    const passwordControl = this.registerForm.get('password');
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
}
// Validador para detectar espacios en blanco
export function noSpacesValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const hasSpaces = /\s/.test(control.value); // Verifica si hay espacios
    return hasSpaces ? { noSpaces: true } : null; // Retorna un error si hay espacios
  };
}

