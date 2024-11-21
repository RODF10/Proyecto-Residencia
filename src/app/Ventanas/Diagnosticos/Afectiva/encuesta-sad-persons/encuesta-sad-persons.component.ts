import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-encuesta-sad-persons',
  templateUrl: './encuesta-sad-persons.component.html',
  styleUrls: ['./encuesta-sad-persons.component.scss']
})
export class EncuestaSADPERSONSComponent {
  // Factores de riesgo en la escala SAD PERSONS
  preguntas = [
    { texto: 'S: Sexo masculino', respuesta: null },
    { texto: 'A: Edad (Age) <20 o >45 años', respuesta: null },
    { texto: 'D: Depresión', respuesta: null },
    { texto: 'P: Tentativa suicida previa', respuesta: null },
    { texto: 'E: Abuso de alcohol o drogas', respuesta: null },
    { texto: 'R: Falta de pensamiento racional (psicosis o trastornos cognitivos)', respuesta: null },
    { texto: 'S: Carencia de apoyo social', respuesta: null },
    { texto: 'O: Plan de suicidio organizado', respuesta: null },
    { texto: 'N: No pareja o cónyuge', respuesta: null },
    { texto: 'S: Enfermedad somática', respuesta: null }
  ];

  constructor(private router: Router) {}

  // Calcular puntaje y redirigir al componente de resultados
  calcularPuntaje() {
    const puntaje = this.preguntas.reduce((total, pregunta) => total + (Number(pregunta.respuesta) || 0), 0);

    let observacion: string;
    if (puntaje <= 2) {
      observacion = 'Alta médica al domicilio con seguimiento ambulatorio';
    } else if (puntaje <= 4) {
      observacion = 'Seguimiento ambulatorio intensivo, considerando ingreso';
    } else if (puntaje <= 6) {
      observacion = 'Recomendado ingreso, sobre todo si hay ausencia de apoyo social';
    } else {
      observacion = 'Ingreso obligatorio incluso en contra de su voluntad';
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
        nombreEncuesta: 'Escala SAD PERSONS',
        puntaje: puntaje,
        observacion: observacion,
        porcentaje: ((puntaje / 10) * 100).toFixed(2)
      }
    });
  }
}

