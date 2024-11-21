import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-encuesta-phq9',
  templateUrl: './encuesta-phq9.component.html',
  styleUrls: ['./encuesta-phq9.component.scss']
})
export class EncuestaPhq9Component {
  // Preguntas y opciones de la encuesta
  preguntas = [
    { texto: 'Poco interés o placer en hacer cosas', respuesta: null },
    { texto: 'Se ha sentido decaído(a), deprimido(a) o sin esperanzas', respuesta: null },
    { texto: 'Ha tenido dificultad para quedarse o permanecer dormido(a), o ha dormido demasiado', respuesta: null },
    { texto: 'Se ha sentido cansado(a) o con poca energía', respuesta: null },
    { texto: 'Sin apetito o ha comido en exceso', respuesta: null },
    { texto: 'Se ha sentido mal con usted mismo(a) – o que es un fracaso o que ha quedado mal con usted mismo(a) o con su familia', respuesta: null },
    { texto: 'Ha tenido dificultad para concentrarse en ciertas actividades, tales como leer el periódico o ver la televisión', respuesta: null },
    { texto: '¿Se ha movido o hablado tan lento que otras personas podrían haberlo notado? O lo contrario – muy inquieto(a) o agitado(a)', respuesta: null },
    { texto: 'Pensamientos de que estaría mejor muerto(a) o de lastimarse de alguna manera', respuesta: null }
  ];

  opciones = [
    { texto: 'Ningún día', valor: 0 },
    { texto: 'Varios días', valor: 1 },
    { texto: 'Más de la mitad de los días', valor: 2 },
    { texto: 'Casi todos los días', valor: 3 }
  ];

  constructor(private router: Router) {}

  // Calcular el puntaje total y redirigir al componente de resultados
  calcularPuntaje() {
    const puntaje = this.preguntas.reduce((total, pregunta) => total + (pregunta.respuesta || 0), 0);
    let observacion: string;

    if (puntaje <= 4) {
      observacion = 'Mínima existencia o ausencia de síntomas depresivos.';
    } else if (puntaje <= 9) {
      observacion = 'Síntomas depresivos leves.';
    } else if (puntaje <= 14) {
      observacion = 'Síntomas depresivos moderados.';
    } else if (puntaje <= 19) {
      observacion = 'Síntomas depresivos moderados a graves.';
    } else {
      observacion = 'Síntomas depresivos graves.';
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
        nombreEncuesta: 'PHQ-9',
        puntaje: puntaje,
        observacion: observacion,
        porcentaje: ((puntaje / 27) * 100).toFixed(2)
      }
    });
  }
}

