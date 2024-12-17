import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/Service/shared.service';
import { Option, QuestionSelec } from 'src/app/Shared/Data';

@Component({
  selector: 'app-encuesta-eat10',
  templateUrl: './encuesta-eat10.component.html',
  styleUrls: ['./encuesta-eat10.component.scss']
})
export class EncuestaEat10Component {
  totalScore: number = 0;
  showError: boolean = false;
  message: string = '';
  // Opciones de respuestas con puntajes
  options: Option[] = [
    { label: 'Ningún problema', score: 0 },
    { label: 'Poco problema', score: 1 },
    { label: 'Problemático', score: 2 },
    { label: 'Muy problemático', score: 3 },
    { label: 'Es un problema serio', score: 4 },
  ];

  questions: QuestionSelec[] = [
    { text: '1. Mi problema para tragar me ha llevado a perder peso', option: this.options },
    { text: '2. Mi problema para tragar interfiere con mi capacidad para comer fuera de casa', option: this.options },
    { text: '3. Tragar líquidos me supone un esfuerzo extra', option: this.options },
    { text: '4. Tragar sólidos me supone un esfuerzo extra', option: this.options },
    { text: '5. Tragar pastillas me supone un esfuerzo extra', option: this.options },
    { text: '6. Tragar es doloroso', option: this.options },
    { text: '7. El placer de comer se ve afectado por mi problema para tragar', option: this.options },
    { text: '8. Cuando trago, la comida se pega en mi garganta', option: this.options },
    { text: '9. Toso cuando como', option: this.options },
    { text: '10. Tragar es estresante', option: this.options },
  ];

  constructor(private router: Router, private share: SharedService){}

  // Método para verificar si todas las preguntas tienen respuestas
  allQuestionsAnswered(): boolean {
    return this.questions.every(question => question.selectedScore != undefined);
  }

  // Calcular el puntaje total
  calculateScore() {
    // Si no todas las preguntas tienen respuestas, muestra error
    if (!this.allQuestionsAnswered()) {
      this.showError = true;
      return;
    }

    this.showError = false;
    this.totalScore = 0;

    for (let question of this.questions) {
      if (question.selectedScore == undefined) {
        this.showError = true;
        return;
      }
      this.totalScore += question.selectedScore;
    }
    this.nextComponent(this.totalScore);
  }

   // Se ejecuta cuando el usuario selecciona una opción
   onOptionSelected(): void {
    if (this.allQuestionsAnswered()) {
      this.showError = false; // Oculta el error automáticamente
    }
  }

  nextComponent(points: number){
    if(points >= 0 && points <= 10){
      this.message = 'No hay un problema significativo con la deglución.';
    } else if(points >= 11 && points <= 20){
      this.message = 'Hay una dificultad leve para tragar.';
    } else if(points >= 21 && points <= 30){
      this.message = 'Se observa una dificultad moderada para tragar.';
    } else {
      this.message = 'Existe una dificultad severa para tragar. Consulte a un especialista.';
    }

    const resultado = {
      point: points,
      encuesta: 'EAT-10',
      observable: this.message,
      porcent: ((points/40) * 100).toFixed(2)
    }
    this.share.saveResults(resultado);
    this.router.navigate(['home/resultado']);
  }
}
