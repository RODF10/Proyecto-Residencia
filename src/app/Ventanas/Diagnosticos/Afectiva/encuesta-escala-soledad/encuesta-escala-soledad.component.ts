import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-encuesta-escala-soledad',
  templateUrl: './encuesta-escala-soledad.component.html',
  styleUrls: ['./encuesta-escala-soledad.component.scss']
})
export class EncuestaEscalaSoledadComponent {
  // Preguntas de la escala
  preguntas = [
    { texto: 'Con qué frecuencia siente que le falta compañía.', respuesta: null },
    { texto: 'Con qué frecuencia se siente excluido/a.', respuesta: null },
    { texto: 'Con qué frecuencia se siente aislado/a de los demás.', respuesta: null }
  ];

  constructor(private router: Router) {}

  // Calcular puntaje total y redirigir al componente de resultados
  calcularPuntaje() {
    const puntaje = this.preguntas.reduce((total, pregunta) => total + (Number(pregunta.respuesta) || 0), 0);

    let observacion: string;
    if (puntaje <= 3) {
      observacion = 'Bajo nivel de soledad.';
    } else if (puntaje <= 6) {
      observacion = 'Nivel moderado de soledad.';
    } else {
      observacion = 'Alto nivel de soledad.';
    }

    // Llamar al método para enviar los resultados
    this.enviarResultados(puntaje, observacion);
  }

  // Método para enviar los resultados al componente de resultados
  enviarResultados(puntaje: number, observacion: string): void {
    if (puntaje === null) {
      alert('Primero calcula el puntaje antes de enviar los resultados.');
      return;
    }

    console.log('Puntaje: ', puntaje, '\nObservación: ', observacion);

    // Redirige al componente de resultados con los datos mediante queryParams
    this.router.navigate(['/resultado'], {
      queryParams: {
        nombreEncuesta: 'Escala de Soledad de 3 Elementos',
        puntaje: puntaje,
        observacion: observacion,
        porcentaje: ((puntaje / 9) * 100).toFixed(2)
      }
    });
  }
}
