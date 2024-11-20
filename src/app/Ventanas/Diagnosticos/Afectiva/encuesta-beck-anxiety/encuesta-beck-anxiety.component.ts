import { Component } from '@angular/core';
import { Router } from '@angular/router';

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

constructor(private router: Router) {}

// Calcular el puntaje total y redirigir al componente de resultados
calcularPuntaje() {
  const puntaje = this.preguntas.reduce((total, pregunta) => total + (Number(pregunta.respuesta) || 0), 0);

  let observacion: string;
  if (puntaje <= 5) {
    observacion = 'Ausente o mínima ansiedad.';
  } else if (puntaje <= 15) {
    observacion = 'Ansiedad leve.';
  } else if (puntaje <= 30) {
    observacion = 'Ansiedad moderada.';
  } else {
    observacion = 'Ansiedad grave.';
  }

  // Redirigir al componente de resultados con los datos
  this.router.navigate(['/resultado'], {
    queryParams: {
      nombreEncuesta: 'Inventario de Ansiedad de Beck',
      puntaje,
      observacion
    }
  });
}
}
