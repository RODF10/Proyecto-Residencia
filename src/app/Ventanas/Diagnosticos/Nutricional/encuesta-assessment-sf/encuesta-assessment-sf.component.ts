import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-encuesta-assessment-sf',
  templateUrl: './encuesta-assessment-sf.component.html',
  styleUrls: ['./encuesta-assessment-sf.component.scss']
})
export class EncuestaAssessmentSFComponent {
  mnaForm: FormGroup;
  showErrors: boolean = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.mnaForm = this.fb.group({
      question1: [null, Validators.required],
      question2: [null, Validators.required],
      question3: [null, Validators.required],
      question4: [null, Validators.required],
      question5: [null, Validators.required],
      question6: [null, Validators.required],
      question7: [null, Validators.required]
    });
  }

  /**
   * Calcula el puntaje total basado en las respuestas.
   */
  calculateScore(): number {
    const values = this.mnaForm.value;
    return Object.keys(values)
      .map(key => Number(values[key]))
      .reduce((total, value) => total + value, 0);
  }

  /**
   * Genera la observación basada en el puntaje obtenido.
   */
  getObservation(puntaje: number): string {
    if (puntaje >= 12 && puntaje <= 14) {
      return 'Sin desnutrición';
    } else if (puntaje >= 8 && puntaje <= 11) {
      return 'Riesgo de desnutrición';
    } else if (puntaje >= 0 && puntaje <= 7) {
      return 'Desnutrición';
    } else {
      return 'Puntaje inválido';
    }
  }

  /**
   * Envía los resultados de la encuesta al componente de resultados.
   */
  enviarResultados(): void {
    if (!this.mnaForm.valid) {
      alert('Completa todas las preguntas antes de enviar los resultados.');
      this.showErrors = true;
      return;
    }

    const puntaje = this.calculateScore();
    const observacion = this.getObservation(puntaje);

    console.log('Puntaje: ', puntaje, '\nObservación: ', observacion);

    this.router.navigate(['home/resultado'], {
      queryParams: {
        nombreEncuesta: 'Mini Nutritional Assessment SF',
        puntaje: puntaje,
        observacion: observacion,
        porcentaje: ((puntaje / 14) * 100).toFixed(2) // Calcula el porcentaje basado en el puntaje máximo
      }
    });
  }
}


