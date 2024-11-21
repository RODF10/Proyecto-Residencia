import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-encuesta-cornell',
  templateUrl: './encuesta-cornell.component.html',
  styleUrls: ['./encuesta-cornell.component.scss']
})
export class EncuestaCornellComponent {
  questions = [
    { text: 'Ansiedad (Expresion ansiosa, rumiacion de ideas, preocupacion)', score: 0 },
    { text: 'Tristesa (Expresion triste, voz apagada, tendencia al llanto)', score: 0 },
    { text: 'Falta de reactividad a los acontesimientos placenteros', score: 0 },
    { text: 'irritabilidad (facilmente enojable, poco temperamento)', score: 0 },
    { text: 'Agitacion (incapacidad de permanecer quieto, jugar con las manos, tirarse el pelo)', score: 0 },
    { text: 'Enlentecimiento (Movimientos, habla y reacciones enlentecidos)', score: 0 },
    { text: 'Quejas Fisicas multiples (puntue 0 si son unicamente gastrointestinales)', score: 0 },
    { text: 'perdida del interes (menos envuelto en las actividades habituales; puntue solamente si el cambio ha sido agudo, p. ej., en menos de 1 mes)', score: 0 },
    { text: 'Perdida de apetito (come menos de lo habitual)', score: 0 },
    { text: 'Perdida de peso (puntue 2 si 2.5kg en 1 mes )', score: 0 },
    { text: 'Perdida de energia (Se fatiga facilmente, incapaz de mantener actividades; puntue solamente si el cambio ha sido agudo, p. ej., en menos de 1 mes )', score: 0 },
    { text: 'variaciones diurnas del estado de animo (los sintomas empeoran por la mañana)', score: 0 },
    { text: 'Dificultad para conciliar el sueño (mas de lo habitual para el paciente ) ', score: 0 },
    { text: 'Despertares multiples durante el sueño', score: 0 },
    { text: 'Despertar precoz (antes de lo habitual para el paciente)', score: 0 },
    { text: 'Suicidio (siente que la vida no merece ser vivida, tiene deseos suicidas o realiza intentos de suicidio) ', score: 0 },
    { text: 'Baja autoestima (autoculpa, autodepreciacion, sentimiento de fracaso)', score: 0 },
    { text: 'Pesimismo (anticipacion a lo peor)', score: 0 },
    { text: 'Delirios congruentes con el estado de ánimo (delirios de pobresa, enfermedades o pérdidas)', score: 0 },
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

    if (this.resultado <= 12) {
      this.observacion = 'depresion (Menor o mayor) ';
    } else if (this.resultado <= 38 ) {
      this.observacion = 'Depresión mayor';
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
        porcentaje: ((this.resultado / 38) * 100).toFixed(2) // Calcula un porcentaje basado en un puntaje máximo de 30.
      }
    });
  }
}

