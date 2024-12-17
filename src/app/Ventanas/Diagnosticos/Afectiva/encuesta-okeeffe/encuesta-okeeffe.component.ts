import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/Service/shared.service';

@Component({
  selector: 'app-encuesta-okeeffe',
  templateUrl: './encuesta-okeeffe.component.html',
  styleUrls: ['./encuesta-okeeffe.component.scss']
})
export class EncuestaOkeeffeComponent implements OnInit {
  encuestaForm!: FormGroup;
  preguntas = [
    { texto: 'Se observa al paciente la mayor parte del tiempo triste, infeliz o deprimido ' },
    { texto: 'Alguna ves el paciente presenta llanto o parece lloroso' },
    { texto: 'El paciente parece estar agitado, inquieto o ancioso' },
    { texto: 'El paciente esta letárgico o refractario a movilizarse' },
    { texto: 'El paciente necesita mucho animo para hacer  las cosas por él (ella)' },
    { texto: 'El paciente parece reservado, muestra minimo interes en el entorno social' }
  ];
  resultado: number = 0;
  interpretacion: string = '';
  showErrors: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private share: SharedService) {}

  ngOnInit(): void {
    // Crea un grupo de controles para cada pregunta
    this.encuestaForm = this.fb.group(
      this.preguntas.reduce((controls, _, index) => {
        controls['pregunta' + index] = [null];
        return controls;
      }, {} as { [key: string]: any })
    );
  }

  // Método para calcular la puntuación
  calcularPuntuacion(): void {
    const respuestas = this.encuestaForm.value;

    // Calcula la puntuación total
    this.resultado = (Object.values(respuestas) as (number | null)[]).reduce(
      (acc: number, val: number | null) => acc + (val || 0),
      0 // Inicializa el acumulador con 0
    );

    // Determina la interpretación
    this.interpretacion =
      this.resultado >= 3
        ? 'Depresión significativa'
        : 'Depresión leve o ausencia de depresión';
  }

  // Método para enviar los resultados
  enviarResultados(): void {
    if (this.resultado === 0 && !this.showErrors) {
      alert('Primero calcula el puntaje antes de enviar los resultados.');
      this.showErrors = true;
      return;
    }

    const resultado = {
      point: this.resultado,
      encuesta: 'Escala Corta de Depresión por Observación Hammond-O\'Keeffe',
      observable: this.interpretacion,
      porcent: ((this.resultado / 21) * 100).toFixed(2)
    }
    console.log('Puntaje: ', this.resultado, '\nObservación: ', this.interpretacion);
    this.share.saveResults(resultado);
    // Redirige al componente Resultados con los datos mediante el estado
    this.router.navigate(['home/resultado']);
  }

  // Método para finalizar la encuesta: calcula el puntaje y luego envía los resultados
  finalizarEncuesta(): void {
    if (this.encuestaForm.valid) {
      this.calcularPuntuacion();  // Calcula la puntuación
      this.enviarResultados();    // Envía los resultados
    } else {
      alert('Por favor, complete todas las preguntas antes de finalizar.');
    }
  }
}
