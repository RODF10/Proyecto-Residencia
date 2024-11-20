import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-encuesta-afc',
  templateUrl: './encuesta-afc.component.html',
  styleUrls: ['./encuesta-afc.component.scss']
})
export class EncuestaAfcComponent implements OnInit {
  gdsForm!: FormGroup;
  preguntas: string[] = [
    '¿En general, está satisfecho(a) con su vida?',
    '¿Ha abandonado muchas de sus tareas habituales y aficiones?',
    '¿Siente que su vida está vacía?',
    '¿Se siente con frecuencia aburrido(a)?',
    '¿Se encuentra de buen humor la mayor parte del tiempo?',
    '¿Teme que algo malo pueda ocurrirle?',
    '¿Se siente feliz la mayor parte del tiempo?',
    '¿Con frecuencia se siente desamparado(a), desprotegido(a)?',
    '¿Prefiere usted quedarse en casa, más que salir y hacer cosas nuevas?',
    '¿Cree que tiene más problemas de memoria que la mayoría de la gente?',
    '¿En estos momentos, piensa que es estupendo estar vivo(a)?',
    '¿Actualmente se siente un(a) inútil?',
    '¿Se siente lleno(a) de energía?',
    '¿Se siente sin esperanza en este momento?',
    '¿Piensa que la mayoría de la gente está en mejor situación que usted?'
  ];
  puntaje: number | null = null;
  observacion: string = '';

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    // Inicializa el formulario
    this.gdsForm = this.fb.group(
      this.preguntas.reduce((controles, _, index) => {
        controles['pregunta' + index] = [null, Validators.required];
        return controles;
      }, {} as { [key: string]: any })
    );
  }

  calcularPuntuacion(): void {
    if (this.gdsForm.invalid) {
      alert('Por favor, responde todas las preguntas.');
      return;
    }

    // Obtiene las respuestas con el tipo explícito
    const respuestas: { [key: string]: number } = this.gdsForm.value;

    // Suma las puntuaciones
    this.puntaje = Object.values(respuestas).reduce(
      (acc: number, val: unknown) => acc + (typeof val === 'number' ? val : 0),
      0
    );

    // Interpreta el resultado
    this.observacion =
      this.puntaje <= 4
        ? 'Normal'
        : 'Presencia de síntomas depresivos';
  }

  enviarResultados(): void {
    if (this.puntaje === null) {
      alert('Primero calcula el puntaje antes de enviar los resultados.');
      return;
    }

    // Redirige al componente Resultados con los datos mediante el estado
    this.router.navigateByUrl('resultado', {
      state: {
        nombreEncuesta: 'GDS',
        puntaje: this.puntaje,
        observacion: this.observacion
      }
    });
  }
}



