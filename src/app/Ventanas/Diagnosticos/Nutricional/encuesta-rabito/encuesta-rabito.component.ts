import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-encuesta-rabito',
  templateUrl: './encuesta-rabito.component.html',
  styleUrls: ['./encuesta-rabito.component.scss']
})
export class EncuestaRabitoComponent implements OnInit {
  rabitoForm: FormGroup; // Formulario reactivo
  resultadoRabito: any; // Resultados del cálculo

  constructor(private fb: FormBuilder) {
    // Configuración del formulario
    this.rabitoForm = this.fb.group({
      sexo: ['', Validators.required], // Sexo: Hombre (1) o Mujer (2)
      circBrazo: [null, Validators.required],
      circAbdominal: [null, Validators.required],
      circPantorrilla: [null, Validators.required],
      mediaEnvergadura: [null, Validators.required],
      edad: [null, Validators.required],
    });
  }

  ngOnInit(): void {}

  calcularResultadosRabito(): void {
    const formValues = this.rabitoForm.value;

    // Fórmula para el peso según Rabito
    const peso =
      0.5759 * formValues.circBrazo +
      0.5263 * formValues.circAbdominal +
      1.2452 * formValues.circPantorrilla -
      4.8689 * formValues.sexo -
      32.9241;

    // Fórmula para la talla según Rabito
    const talla =
      63.525 -
      3.237 * formValues.sexo -
      0.06904 * formValues.edad +
      1.293 * formValues.mediaEnvergadura;

    // Guardar los resultados
    this.resultadoRabito = {
      peso: peso.toFixed(2),
      talla: talla.toFixed(2),
    };
  }
}