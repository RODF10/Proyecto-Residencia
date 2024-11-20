import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Crea un grupo de controles para cada pregunta
    this.cesForm = this.fb.group(
      this.preguntas.reduce((controls, _, index) => {
        controls['pregunta' + index] = [null];
        return controls;
      }, {} as { [key: string]: any })
    );
  }

  calcularPuntuacion(): void {
    // Obtiene los valores del formulario
    const respuestas = this.cesForm.value;

    // Calcula la puntuación total y asegura que acc siempre es un número
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
}
