import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

interface MNAForm {
  [key: string]: number | null;
}

@Component({
  selector: 'app-encuesta-assessment',
  templateUrl: './encuesta-assessment.component.html',
  styleUrls: ['./encuesta-assessment.component.scss']
})

export class EncuestaAssessmentComponent {
  mnaForm: FormGroup;
  cribajePreguntas = [
    {
      texto: 'A. ¿Ha perdido el apetito?',
      opciones: [
        { texto: 'Ha comido mucho menos', valor: 0 },
        { texto: 'Ha comido menos', valor: 1 },
        { texto: 'Ha comido igual', valor: 2 },
      ],
    },
    {
      texto: 'B. Pérdida reciente de peso (< 3 meses)',
      opciones: [
        { texto: 'Pérdida de peso > 3 kg', valor: 0 },
        { texto: 'No lo sabe', valor: 1 },
        { texto: 'Pérdida de peso entre 1 y 3 kg', valor: 2 },
        { texto: 'No ha habido pérdida de peso', valor: 3 },
      ],
    },
    {
      texto: 'C. Movilidad ',
      opciones: [
        { texto: 'de la cama al sillon', valor: 0 },
        { texto: 'autonomia en el interior', valor: 1 },
        { texto: 'sale del domicilio', valor: 2},
      ],
    },
    {
      texto: 'D. Ha tenido una enfermedad aguda o situacion de estres psicologico en los ultimos 3 meses',
      opciones: [
        { texto: 'Si', valor: 0 },
        { texto: 'No', valor: 2 },
      ],
    },
    {
      texto: 'E. Problemas neuropsicologicos',
      opciones: [
        { texto: 'Demensia o depresion grave', valor: 0 },
        { texto: 'Demensia moderada', valor: 1 },
        { texto: 'Sin problemas psicologicos', valor: 2 },
      ],
    },
    {
      texto: 'F. Indice de masa corporal (IMC) = Peso en Kg/(talla en m2)',
      opciones: [
        { texto: 'IMC < 19', valor: 0 },
        { texto: '19 < IMC < 21', valor: 1 },
        { texto: '21 < IMC < 23', valor: 2 },
        { texto: 'IMC > 23', valor: 3 },
      ],
    },
  ];

  evaluacionPreguntas = [
    {
      texto: 'G. ¿El paciente vive independientemente?',
      opciones: [
        { texto: 'Sí', valor: 1 },
        { texto: 'No', valor: 0 },
      ],
    },
    {
      texto: 'H. ¿Toma más de 3 medicamentos al día?',
      opciones: [
        { texto: 'Sí', valor: 0 },
        { texto: 'No', valor: 1 },
      ],
    },
    {
      texto: 'I. Ulceras o lesiones cutaneas?',
      opciones: [
        { texto: 'Sí', valor: 0 },
        { texto: 'No', valor: 1 },
      ],
    },
    {
      texto: 'J. Cuantas Comidas comidas toma al dia?',
      opciones: [
        { texto: '1 comida', valor: 0 },
        { texto: '2 comidas', valor: 1 },
        { texto: '3 comidas', valor: 2 },
      ],
    },
    {
      texto: 'K. Consume el paciente alguno de los siguientes grupos alimenticios regularmente:',
      subPreguntas: [
        { texto: 'Lácteos', valor: 0 },
        { texto: 'Huevos y legumbres', valor: 0 },
        { texto: 'Carne, pescado o aves', valor: 0 },
      ],
    },
    {
      texto: 'L. consume Frutas o verduras al menos 2 veces al dia ?',
      opciones: [
        { texto: 'No', valor: 0 },
        { texto: 'Si', valor: 1 },
      ],
    },
    {
      texto: 'M. cuantos vasos de agua u otros liquidos toma al dia? (agua, zumo, cafe, té, leche, vino, cerveza...)',
      opciones: [
        { texto: 'Menos de 3 vasos', valor: 0.0 },
        { texto: 'de 3 a 5 vasos', valor: 0.5 },
        { texto: 'mas de 5 vasos', valor: 1.0 },
      ],
    },
    {
      texto: 'N. Forma de alimentarse',
      opciones: [
        { texto: 'Necesita ayuda', valor: 0 },
        { texto: 'se alimenta solo con dificultad', valor: 1 },
        { texto: 'se alimenta solo sin dificultad', valor: 2 },
      ],
    },
    {
      texto: 'O. Se considera el pacente que esta bien nutrido?',
      opciones: [
        { texto: 'Mal nutricion grave', valor: 0 },
        { texto: 'No lo sabe o malnutricion moderada', valor: 1 },
        { texto: 'sin problemas de nutricion', valor: 2 },
      ],
    },
    {
      texto: 'P. En comparacion con las personas en su edad, como encuestra el paciente su salud?',
      opciones: [
        { texto: 'peor', valor: 0.0 },
        { texto: 'No lo sabe', valor: 0.5 },
        { texto: 'igual', valor: 1.0 },
        { texto: 'Mejor', valor: 2.0 },
      ],
    },
    {
      texto: 'Q. circunferencia branquial (CD en cm)',
      opciones: [
        { texto: 'CB < 21', valor: 0.0 },
        { texto: '21 < CB < 22', valor: 0.5 },
        { texto: 'CB > 22', valor: 1.0 },
      ],
    },
    {
      texto: 'R. Circunferencia de la pantorrilla (CP en cm)',
      opciones: [
        { texto: 'CP < 31', valor: 0 },
        { texto: 'CP > 31', valor: 1 },
      ],
    },
  ];

  constructor(private fb: FormBuilder, private router: Router) {
    const formControls: MNAForm = {};

    // Configurar controles para las preguntas
    this.cribajePreguntas.forEach((_, index) => {
      formControls[`pregunta${index}`] = [null, Validators.required];
    });

    this.evaluacionPreguntas.forEach((_, index) => {
      formControls[`evaluacionPregunta${index}`] = [null, Validators.required];
    });

    // Configurar controles para "Consume el paciente"
    formControls['consumePaciente'] = this.fb.group({
      lacteos: [null, Validators.required],
      huevosLegumbres: [null, Validators.required],
      carnePescadoAves: [null, Validators.required],
    });

    this.mnaForm = this.fb.group(formControls);
  }

  enviarResultados() {
    if (this.mnaForm.invalid) {
      alert('Completa todas las preguntas antes de enviar.');
      return;
    }
  
    const puntajeCribaje = this.calculateScore(this.cribajePreguntas, 'pregunta');
    const puntajeEvaluacion = this.calculateScore(this.evaluacionPreguntas, 'evaluacionPregunta');
    const puntajeK = this.calculateSubPreguntaKScore();
    const puntajeTotal = puntajeCribaje + puntajeEvaluacion + puntajeK;
  
    let resultado;
    if (puntajeTotal >= 24) {
      resultado = 'Estado nutricional normal';
    } else if (puntajeTotal >= 17) {
      resultado = 'Riesgo de desnutrición';
    } else {
      resultado = 'Desnutrición';
    }
  
    console.log('Puntaje total:', puntajeTotal, 'Resultado:', resultado);
  
    this.router.navigate(['/resultados'], {
      queryParams: {
        puntaje: puntajeTotal,
        resultado: resultado,
      },
    });
  }

  calculateScore(preguntas: any[], prefix: string): number {
    return preguntas.reduce((total, _, index) => {
      const respuesta = this.mnaForm.get(`${prefix}${index}`)?.value;
      return total + (respuesta !== null ? Number(respuesta) : 0);
    }, 0);
  }
  calculateSubPreguntaKScore(): number {
    const preguntaK = this.evaluacionPreguntas.find(p => p.texto.startsWith('K.'));
    if (!preguntaK || !preguntaK.subPreguntas) return 0;
  
    const seleccionados = preguntaK.subPreguntas.filter(subPregunta => subPregunta.seleccionado).length;
  
    if (seleccionados === 0) return 0;
    if (seleccionados === 1) return 0.5;
    if (seleccionados >= 2) return 1.0;
  
    return 0;
  }

  calculateConsumePacienteScore(): number {
    const consumePaciente = this.mnaForm.get('consumePaciente')?.value;

    if (!consumePaciente) return 0;

    // Contar respuestas "sí"
    const siCount = Object.values(consumePaciente).filter(value => value === 'si').length;

    // Devolver puntaje basado en la cantidad de "sí"
    if (siCount === 0 || siCount === 1) {
      return 0.0;
    } else if (siCount === 2) {
      return 0.5;
    } else if (siCount === 3) {
      return 1.0;
    }

    return 0.0; // En caso de error
  }
}