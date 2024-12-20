import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-encuesta-chumlea',
  templateUrl: './encuesta-chumlea.component.html',
  styleUrls: ['./encuesta-chumlea.component.scss']
})
export class EncuestaChumleaComponent implements OnInit {
  chumleaForm: FormGroup;
  resultado: any;

  constructor(private fb: FormBuilder) {
    this.chumleaForm = this.fb.group({
      sexo: ['', Validators.required],
      circBrazo: [null, Validators.required],
      circPantorrilla: [null, Validators.required],
      pliegueSubescapular: [null, Validators.required],
      alturaRodilla: [null, Validators.required],
      alturaTalonRodilla: [null, Validators.required],
      mediaEnvergadura: [null, Validators.required],
      edad: [null, Validators.required],
    });
  }

  ngOnInit(): void {}

  calcularResultados(): void {
    const formValues = this.chumleaForm.value;
    const sexo = formValues.sexo;

    // Cálculo de peso
    const peso =
      sexo === 'mujer'
        ? this.calcularPesoMujer(formValues)
        : this.calcularPesoHombre(formValues);

    // Cálculo de talla
    const talla =
      sexo === 'mujer'
        ? this.calcularTallaMujer(formValues)
        : this.calcularTallaHombre(formValues);

    // Cálculo de estatura por media envergadura
    const estatura =
      sexo === 'mujer'
        ? 1.35 * formValues.mediaEnvergadura + 60.1
        : 1.4 * formValues.mediaEnvergadura + 57.8;

    // Guardar resultados
    this.resultado = {
      peso: peso.toFixed(2),
      talla: talla.toFixed(2),
      estatura: estatura.toFixed(2),
    };
  }

  calcularPesoMujer(values: any): number {
    return (
      values.circBrazo * 0.98 +
      values.circPantorrilla * 1.27 +
      values.pliegueSubescapular * 0.4 +
      values.alturaRodilla * 0.87 -
      62.35
    );
  }

  calcularPesoHombre(values: any): number {
    return (
      values.circBrazo * 1.73 +
      values.circPantorrilla * 0.98 +
      values.pliegueSubescapular * 0.37 +
      values.alturaRodilla * 1.16 -
      81.69
    );
  }

  calcularTallaMujer(values: any): number {
    return 1.83 * values.alturaTalonRodilla - 0.24 * values.edad + 84.88;
  }

  calcularTallaHombre(values: any): number {
    return 2.02 * values.alturaTalonRodilla - 0.04 * values.edad + 64.19;
  }
}
