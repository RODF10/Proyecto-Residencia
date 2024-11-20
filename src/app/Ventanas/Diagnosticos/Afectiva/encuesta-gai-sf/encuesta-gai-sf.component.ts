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

  let observacion = puntaje >= 3
    ? 'Posible presencia de ansiedad geriátrica.'
    : 'No se detecta ansiedad significativa.';

  // Redirigir al componente de resultados con los datos
  this.router.navigate(['/resultado'], {
    queryParams: {
      nombreEncuesta: 'GAI-SF',
      puntaje,
      observacion
    }
  });
}
}
