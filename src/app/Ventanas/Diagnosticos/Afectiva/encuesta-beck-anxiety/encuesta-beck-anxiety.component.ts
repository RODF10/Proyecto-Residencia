import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/Service/shared.service';

@Component({
  selector: 'app-encuesta-beck-anxiety',
  templateUrl: './encuesta-beck-anxiety.component.html',
  styleUrls: ['./encuesta-beck-anxiety.component.scss']
})
export class EncuestaBeckAnxietyComponent {
  // Preguntas del inventario
  preguntas = [
    { texto: 'Torpe o entumecido.', respuesta: null },
    { texto: 'Acalorado.', respuesta: null },
    { texto: 'Con temblor en las piernas.', respuesta: null },
    { texto: 'Incapaz de relajarse.', respuesta: null },
    { texto: 'Con temor a que ocurra lo peor.', respuesta: null },
    { texto: 'Mareado, o que se le va la cabeza.', respuesta: null },
    { texto: 'Con latidos fuertes del corazón y acelerados.', respuesta: null },
    { texto: 'Inestable.', respuesta: null },
    { texto: 'Atemorizado o asustado.', respuesta: null },
    { texto: 'Nervioso.', respuesta: null },
    { texto: 'Con sensación de bloqueo.', respuesta: null },
    { texto: 'Con temblores en las manos.', respuesta: null },
    { texto: 'Inquieto, inseguro.', respuesta: null },
    { texto: 'Con miedo a perder el control.', respuesta: null },
    { texto: 'Con sensación de ahogo.', respuesta: null },
    { texto: 'Con temor a morir.', respuesta: null },
    { texto: 'Con miedo.', respuesta: null },
    { texto: 'Con problemas digestivos.', respuesta: null },
    { texto: 'Con desvanecimientos.', respuesta: null },
    { texto: 'Con rubor facial.', respuesta: null },
    { texto: 'Con sudores, fríos o calientes.', respuesta: null }
  ];

  puntaje: number = 0;
  observacion: string = '';
  showErrors: boolean = false;

  constructor(private router: Router, private share: SharedService) {}

  // Método para calcular el puntaje
  calcularPuntaje(): void {
    this.puntaje = this.preguntas.reduce((total, pregunta) => total + (Number(pregunta.respuesta) || 0), 0);

    if (this.puntaje <= 5) {
      this.observacion = 'Ausente o mínima ansiedad.';
    } else if (this.puntaje <= 15) {
      this.observacion = 'Ansiedad leve.';
    } else if (this.puntaje <= 30) {
      this.observacion = 'Ansiedad moderada.';
    } else {
      this.observacion = 'Ansiedad grave.';
    }

    console.log('Puntaje calculado: ', this.puntaje, 'Observación: ', this.observacion);
  }

  // Método para enviar resultados al componente de resultados
  enviarResultados(puntaje: number, observacion: string): void {
   if (puntaje === null) {
      alert('Primero calcula el puntaje antes de enviar los resultados.');
      return;
    } else {
      this.showErrors = true;
    }
    
    const resultados = {
      point: this.puntaje,
      encuesta: 'Inventario de Ansiedad de Beck',
      observable: this.observacion,
      porcent: ((this.puntaje / 21) * 100).toFixed(2)
    }

    console.log('Puntaje: ', puntaje, '\nObservación: ', observacion);

    // Redirige al componente Resultados con los datos mediante el estado
    if (this.showErrors) {
      this.share.saveResults(resultados);
      this.router.navigate(['home/resultado']);
    }
  }

  // Método que combina el cálculo y el envío de los resultados
  finalizarEncuesta(): void {
    // Calcular el puntaje
    this.calcularPuntaje();

    // Enviar los resultados al componente de resultados
    this.enviarResultados(this.puntaje, this.observacion);
  }
}
