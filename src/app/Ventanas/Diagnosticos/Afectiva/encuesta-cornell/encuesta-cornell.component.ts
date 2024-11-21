import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-encuesta-cornell',
  templateUrl: './encuesta-cornell.component.html',
  styleUrls: ['./encuesta-cornell.component.scss']
})
export class EncuestaCornellComponent {
  questions = [
    { text: 'Tristeza', score: 0 },
    { text: 'Llanto', score: 0 },
    { text: 'Pérdida de interés', score: 0 },
    { text: 'Agitación psicomotora', score: 0 },
    { text: 'Pérdida de peso', score: 0 },
    { text: 'Insomnio', score: 0 },
    { text: 'Fatiga', score: 0 },
    { text: 'Sentimientos de inutilidad', score: 0 },
    { text: 'Dificultad para concentrarse', score: 0 },
    { text: 'Ideación suicida', score: 0 },
  ];

  resultado: number = 0;
  observacion: string = '';
  showErrors: boolean = false;

  constructor(private router: Router) {}

  setScore(index: number, score: number): void {
    this.questions[index].score = score;
  }

  calculateScore(): void {
    this.resultado = this.questions.reduce((sum, question) => sum + question.score, 0);

    if (this.resultado <= 6) {
      this.observacion = 'Sin depresión o leve';
    } else if (this.resultado <= 10) {
      this.observacion = 'Depresión moderada';
    } else {
      this.observacion = 'Depresión severa';
    }

    this.showErrors = true; // Activa la validación para enviar resultados.
  }

  enviarResultados(): void {
    if (!this.showErrors || this.resultado === null) {
      alert('Primero calcula el puntaje antes de enviar los resultados.');
      return;
    }

    console.log('Puntaje:', this.resultado, '\nObservación:', this.observacion);

    this.router.navigate(['/resultado'], {
      queryParams: {
        nombreEncuesta: 'Escala de Cornell',
        puntaje: this.resultado,
        observacion: this.observacion,
        porcentaje: ((this.resultado / 30) * 100).toFixed(2) // Calcula un porcentaje basado en un puntaje máximo de 30.
      }
    });
  }
}

