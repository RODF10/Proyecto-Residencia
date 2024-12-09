import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-encuesta-gai-sf',
  templateUrl: './encuesta-gai-sf.component.html',
  styleUrls: ['./encuesta-gai-sf.component.scss']
})
export class EncuestaGaiSfComponent {
  // Preguntas de la encuesta
  preguntas = [
    { texto: 'Me paso mucho tiempo preocupado.', respuesta: null },
    { texto: 'Las pequeñas cosas me molestan mucho.', respuesta: null },
    { texto: 'Me considero una persona preocupada.', respuesta: null },
    { texto: 'A menudo me siento nervioso.', respuesta: null },
    { texto: 'Mis propios pensamientos me hacen sentir ansioso.', respuesta: null }
  ];

  constructor(private router: Router) {}

  // Calcular el puntaje total y redirigir al componente de resultados
  calcularPuntaje() {
    const puntaje = this.preguntas.reduce((total, pregunta) => total + (Number(pregunta.respuesta) || 0), 0);

    let observacion: string;
    if (puntaje >= 3) {
      observacion = 'Posible presencia de ansiedad geriátrica.';
    } else {
      observacion = 'No se detecta ansiedad significativa.';
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
    this.router.navigate(['home/resultado'], {
      queryParams: {
        nombreEncuesta: 'GAI-SF',
        puntaje: puntaje,
        observacion: observacion,
        porcentaje: ((puntaje / 10) * 100).toFixed(2)
      }
    });
  }
}

