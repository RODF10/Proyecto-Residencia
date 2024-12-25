import { Component } from '@angular/core';

@Component({
  selector: 'app-encuesta-guss',
  templateUrl: './encuesta-guss.component.html',
  styleUrls: ['./encuesta-guss.component.scss']
})
export class EncuestaGussComponent {
  preguntasPreliminares = [
    { texto: 'Vigilancia (el paciente debe estar alerta por lo menos 15 minutos )', puntajeSi: 1, puntajeNo: 0 },
    { texto: 'Tos y/o carraspeo (tos voluntaria) (el pciente debera toser o carraspear 2 veces.)', puntajeSi: 1, puntajeNo: 0 },
    { texto: 'Deglusion de saliva: deglusion exitosa', puntajeSi: 1, puntajeNo: 0 },
    { texto: 'Sialorea', puntajeSi: 0, puntajeNo: 1 },
    { texto: 'cambios en la voz (ronca, humeda, debil)', puntajeSi: 0, puntajeNo: 1 },
    // Agrega más preguntas...
  ];

  preguntasDirectas = [
    { texto: 'DEGLUSION:', puntajeSemisolido: 0, puntajeLiquido: 0, puntajeSolido: 0 },
    { texto: 'Deglución no es posible', puntajeSemisolido: 0, puntajeLiquido: 0, puntajeSolido: 0 },
    { texto: 'Deglución retrasada (> 2 seg.) (texturas sólidas > 10 seg.)', puntajeSemisolido: 1, puntajeLiquido: 1, puntajeSolido: 1 },
    { texto: 'Deglución exitosa', puntajeSemisolido: 2, puntajeLiquido: 2, puntajeSolido: 2 },
    { texto: 'TOS (involuntaria): (antes, durante, y despues de la deglusion, hasta 3 minutos después) ', puntajeSemisolido: 0, puntajeLiquido: 0, puntajeSolido: 0 },
    { texto: 'SI', puntajeSemisolido: 0, puntajeLiquido: 0, puntajeSolido: 0 },
    { texto: 'NO', puntajeSemisolido: 1, puntajeLiquido: 1, puntajeSolido: 1 },
    { texto: 'SIALORREA:', puntajeSemisolido: 0, puntajeLiquido: 0, puntajeSolido: 0 },
    { texto: 'SI', puntajeSemisolido: 0, puntajeLiquido: 0, puntajeSolido: 0 },
    { texto: 'NO', puntajeSemisolido: 1, puntajeLiquido: 1, puntajeSolido: 1 },
    { texto: 'CAMBIOS EN LA VOZ: (Escuchar antes y despues de la deglusion, el paciente debera decir /O/ )', puntajeSemisolido: 0, puntajeLiquido: 0, puntajeSolido: 0 },
    { texto: 'SI', puntajeSemisolido: 0, puntajeLiquido: 0, puntajeSolido: 0 },
    { texto: 'NO', puntajeSemisolido: 1, puntajeLiquido: 1, puntajeSolido: 1 },
    // Agrega más preguntas...
  ];

  puntajePreliminar = 0;
  puntajeDirecta = 0;
  puntajeTotal = 0;
  resultado: any;

  asignarPuntaje(index: number, puntaje: number, tipo: string) {
    if (tipo === 'preliminar') {
      this.puntajePreliminar += puntaje;
    } else {
      this.puntajeDirecta += puntaje;
    }
  }

  calcularPuntaje() {
    this.puntajeTotal = this.puntajePreliminar + this.puntajeDirecta;
    this.evaluarResultado();
  }

  evaluarResultado() {
    if (this.puntajeTotal >= 20) {
      this.resultado = {
        codigo: 'Leve/ Sin Disfagia',
        descripcion: 'Mínimo riesgo de aspiración.',
        recomendaciones: 'Dieta normal y líquidos regulares.'
      };
    } else if (this.puntajeTotal >= 15) {
      this.resultado = {
        codigo: 'Disfagia Leve',
        descripcion: 'Bajo riesgo de aspiración.',
        recomendaciones: 'Dieta para disfagia y líquidos muy lentamente.'
      };
    } else if (this.puntajeTotal >= 10) {
      this.resultado = {
        codigo: 'Disfagia Moderada',
        descripcion: 'Riesgo de aspiración.',
        recomendaciones: 'Dieta con textura semisólida.'
      };
    } else {
      this.resultado = {
        codigo: 'Disfagia Severa',
        descripcion: 'Alto riesgo de aspiración.',
        recomendaciones: 'Nada por boca y evaluación funcional.'
      };
    }
  }
}
