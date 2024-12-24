import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-encuesta-volumen',
  templateUrl: './encuesta-volumen.component.html',
  styleUrls: ['./encuesta-volumen.component.scss']
})
export class EncuestaVolumenComponent implements OnInit {
  pruebaForm: FormGroup;
  volumenes: number[] = [5, 10, 20]; // Volúmenes definidos en el test

  constructor(private fb: FormBuilder, private router: Router) {
    this.pruebaForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.crearControles();
  }

  // Genera dinámicamente los controles del formulario
  crearControles(): void {
    for (let viscosidad of ['nectar', 'liquida', 'pudding']) {
      for (let volumen of this.volumenes) {
        this.pruebaForm.addControl(`${viscosidad}_${volumen}`, this.fb.control(null));
      }
    }
  }

  // Método de envío
  enviarResultados(): void {
    const resultados: any = {};

    for (let viscosidad of ['nectar', 'liquida', 'pudding']) {
      for (let volumen of this.volumenes) {
        resultados[`${viscosidad}_${volumen}`] = this.pruebaForm.get(
          `${viscosidad}_${volumen}`
        )?.value;
      }
    }

    console.log('Resultados:', resultados);

    // Envía resultados a otro componente usando router y queryParams
    this.router.navigate(['home/resultado'], {
      queryParams: {
        nombreEncuesta: 'Prueba Volumen-Viscosidad',
        resultados: JSON.stringify(resultados),
      },
    });
  }
}
