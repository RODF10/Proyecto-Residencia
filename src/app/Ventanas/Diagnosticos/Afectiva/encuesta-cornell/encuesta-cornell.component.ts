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

  constructor(private router: Router) {}

  setScore(index: number, score: number): void {
    this.questions[index].score = score;
  }

  calculateScore(): void {
    const totalScore = this.questions.reduce((sum, question) => sum + question.score, 0);
    let observacion: string;

    if (totalScore <= 6) {
      observacion = 'Sin depresión o leve';
    } else if (totalScore <= 10) {
      observacion = 'Depresión moderada';
    } else {
      observacion = 'Depresión severa';
    }

    // Redirigir al componente de resultado con los datos
    this.router.navigate(['/resultado'], {
      queryParams: {
        nombre: 'Escala de Cornell',
        puntaje: totalScore,
        observacion: observacion
      }
    });
  }
}
