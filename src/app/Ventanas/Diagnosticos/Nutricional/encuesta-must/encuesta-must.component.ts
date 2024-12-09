import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-encuesta-must',
  templateUrl: './encuesta-must.component.html',
  styleUrls: ['./encuesta-must.component.scss']
})
export class EncuestaMustComponent implements OnInit {
  MustForm: FormGroup = this.fb.group({ // Inicialización directa aquí
    imc: [null, Validators.required],
    perdidaPeso: [null, Validators.required],
    enfermedadAguda: [null, Validators.required],
    riesgoGlobal: [{ value: '', disabled: true }],
  });

  imcPuntuacion: number = 0;
  perdidaPesoPuntuacion: number = 0;
  enfermedadAgudaPuntuacion: number = 0;
  puntaje: number = 0;
  observacion: string = '';

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    // Ya no es necesario inicializar mustForm aquí
    this.MustForm.get('imc')?.valueChanges.subscribe(() => this.calcularPuntuaciones());
    this.MustForm.get('perdidaPeso')?.valueChanges.subscribe(() => this.calcularPuntuaciones());
    this.MustForm.get('enfermedadAguda')?.valueChanges.subscribe(() => this.calcularPuntuaciones());
  }

  calcularPuntuaciones(): void {
    // Asignar puntuación para el IMC
    const imc = this.MustForm.get('imc')?.value;
    if (imc >= 20) {
      this.imcPuntuacion = 0;
    } else if (imc >= 18.5) {
      this.imcPuntuacion = 1;
    } else {
      this.imcPuntuacion = 2;
    }

    // Asignar puntuación para la pérdida de peso
    const perdidaPeso = this.MustForm.get('perdidaPeso')?.value;
    if (perdidaPeso <= 5) {
      this.perdidaPesoPuntuacion = 0;
    } else if (perdidaPeso <= 10) {
      this.perdidaPesoPuntuacion = 1;
    } else {
      this.perdidaPesoPuntuacion = 2;
    }

    // Asignar puntuación para la enfermedad aguda
    const enfermedadAguda = this.MustForm.get('enfermedadAguda')?.value;
    if (enfermedadAguda) {
      this.enfermedadAgudaPuntuacion = 2;
    } else {
      this.enfermedadAgudaPuntuacion = 0;
    }

    // Calcular la puntuación total
    this.puntaje = this.imcPuntuacion + this.perdidaPesoPuntuacion + this.enfermedadAgudaPuntuacion;

    // Determinar el riesgo global
    if (this.puntaje <= 2) {
      this.observacion = 'Riesgo Bajo: Cuidados clínicos rutinarios';
    } else if (this.puntaje === 3) {
      this.observacion = 'Riesgo Medio: Observar se recomienda hospital y cuidados domiciliarios';
    } else {
      this.observacion = 'Riesgo Alto: Tratar en domicilio, hospital o comunidad';
    }

    // Actualizar el valor de "riesgoGlobal" en el formulario
    this.MustForm.get('riesgoGlobal')?.setValue(this.observacion);
  }

  enviarFormulario(): void {
    if (this.MustForm.invalid) {
      alert('Por favor complete todos los campos.');
      return;
    }

    console.log('Formulario enviado:', this.MustForm.value);
    // Aquí podrías navegar a otra página o procesar el formulario
    this.router.navigate(['home/resultado'], {
      queryParams: { puntaje: this.puntaje, observacion: this.observacion },
    });
  }
}