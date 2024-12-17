import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-encuesta-glim',
  templateUrl: './encuesta-glim.component.html',
  styleUrls: ['./encuesta-glim.component.scss']
})
export class EncuestaGlimComponent {
  glimForm: FormGroup;
  showErrors: boolean = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.glimForm = this.fb.group({
      perdidaPeso: [null, Validators.required],
      imc: [null, Validators.required],
      masaMuscular: [null, Validators.required],
      ingestaAlimentos: [null, Validators.required],
      cargaInflamatoria: [null, Validators.required],
    });
  }

  calculateScore(): number {
    let resul = 0;
    // Obtén el puntaje sumando los valores seleccionados de los controles
    const perdidaPeso = this.glimForm.value.perdidaPeso;
    const imc = this.glimForm.value.imc;
    const masaMuscular = this.glimForm.value.masaMuscular;
    const ingestaAlimentos = this.glimForm.value.ingestaAlimentos;
    const cargaInflamatoria = this.glimForm.value.cargaInflamatoria;

    return perdidaPeso + imc + masaMuscular + ingestaAlimentos + cargaInflamatoria;
  }

  getObservation(score: number): string {
    // Devuelve una observación según el puntaje
    if (score >= 3) {
      return 'Desnutrición diagnosticada';
    } else {
      return 'No cumple con criterios de desnutrición';
    }
  }

  enviarResultados(): void {
    if (!this.glimForm.valid) {
      alert('Completa todas las preguntas antes de enviar los resultados.');
      this.showErrors = true;
      return;
    }

    const puntaje = this.calculateScore();
    const observacion = this.getObservation(puntaje);

    console.log('Puntaje: ', puntaje, '\nObservación: ', observacion);

    this.router.navigate(['home/resultado'], {
      queryParams: {
        nombreEncuesta: 'Criterios GLIM',
        puntaje: puntaje,
        observacion: observacion,
        porcentaje: ((puntaje / 2) * 100).toFixed(2) // Calcula el porcentaje basado en un puntaje máximo (puedes ajustar el máximo si es diferente)
      }
    });
  }
}
