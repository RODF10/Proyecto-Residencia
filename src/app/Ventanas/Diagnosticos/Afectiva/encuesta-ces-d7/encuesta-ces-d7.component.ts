import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-encuesta-ces-d7',
  templateUrl: './encuesta-ces-d7.component.html',
  styleUrls: ['./encuesta-ces-d7.component.scss']
})
export class EncuestaCESD7Component implements OnInit {
  cesForm!: FormGroup;
  preguntas = [
    { texto: '¿Sentía como si no pudiera quitarse la tristeza?' },
    { texto: '¿Le costaba concentrarse en lo que estaba haciendo?' },
    { texto: '¿Se sintió deprimido/a?' },
    { texto: '¿Le parecía que todo lo que hacía era un esfuerzo?' },
    { texto: '¿No durmió bien?' },
    { texto: '¿Disfrutó de la vida?' },
    { texto: '¿Se sintió triste?' }
  ];
  resultado: number = 0;
  interpretacion: string = '';
  showErrors: boolean = false;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    // Crea un grupo de controles para cada pregunta
    this.cesForm = this.fb.group(
      this.preguntas.reduce((controls, _, index) => {
        controls['pregunta' + index] = [null];
        return controls;
      }, {} as { [key: string]: any })
    );
  }

  // Método para calcular la puntuación
  calcularPuntuacion(): void {
    const respuestas = this.cesForm.value;

    // Calcula la puntuación total
    this.resultado = (Object.values(respuestas) as (number | null)[]).reduce(
      (acc: number, val: number | null) => acc + (val || 0),
      0 // Inicializa el acumulador con 0
    );

    // Determina la interpretación
    this.interpretacion =
      this.resultado >= 5
        ? 'Síntomas depresivos significativos'
        : 'Normal';
  }

  // Método para enviar los resultados
  enviarResultados(): void {
    if (this.resultado === 0 && !this.showErrors) {
      alert('Primero calcula el puntaje antes de enviar los resultados.');
      this.showErrors = true;
      return;
    }

    console.log('Puntaje: ', this.resultado, '\nObservación: ', this.interpretacion);

    // Redirige al componente Resultados con los datos mediante el estado
    this.router.navigate(['/resultado'], {
      queryParams: {
        nombreEncuesta: 'CES-D7',
        puntaje: this.resultado,
        observacion: this.interpretacion,
        porcentaje: ((this.resultado / 21) * 100).toFixed(2) // Porcentaje basado en 7 preguntas con valor máximo de 3 cada una
      }
    });
  }

  // Método para finalizar la encuesta: calcula el puntaje y luego envía los resultados
  finalizarEncuesta(): void {
    if (this.cesForm.valid) {
      this.calcularPuntuacion();  // Calcula la puntuación
      this.enviarResultados();    // Envía los resultados
    } else {
      alert('Por favor, complete todas las preguntas antes de finalizar.');
    }
  }
}


