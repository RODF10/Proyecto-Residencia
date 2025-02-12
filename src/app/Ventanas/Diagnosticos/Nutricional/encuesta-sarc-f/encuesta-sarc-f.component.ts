import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/Service/shared.service';

@Component({
  selector: 'app-encuesta-sarc-f',
  templateUrl: './encuesta-sarc-f.component.html',
  styleUrls: ['./encuesta-sarc-f.component.scss']
})
export class EncuestaSarcFComponent implements OnInit{
  sarcFForm: FormGroup;
  puntuacionTotal: number = 0;

  constructor(private fb: FormBuilder, private router: Router, private shared: SharedService) {
    this.sarcFForm = this.fb.group({
      strength: [0, Validators.required],
      walking: [0, Validators.required],
      chair: [0, Validators.required],
      stairs: [0, Validators.required],
      falls: [0, Validators.required],
    });
  }

  ngOnInit(): void {}

  calcularPuntuacion() {
    const values = this.sarcFForm.value;
    this.puntuacionTotal =
      +values.strength +
      +values.walking +
      +values.chair +
      +values.stairs +
      +values.falls;
  }

  enviarResultados() {
    if (this.sarcFForm.invalid) {
      alert('Completa todas las preguntas antes de enviar.');
      return;
    }

    const puntajeTotal = this.calcularTotal();
    let observacion;

    if (puntajeTotal >= 4) {
      observacion = 'Alta probabilidad de sarcopenia';
    } else {
      observacion = 'Baja probabilidad de sarcopenia';
    }

    console.log('Puntaje total:', puntajeTotal, 'Resultado:', observacion);

    const resultado = {
      point: puntajeTotal,
      encuesta: 'SARC-F',
      observable: observacion,
      porcent: ((puntajeTotal/10)*100).toFixed(2)
    }
    
    this.shared.saveResults(resultado);
    this.router.navigate(['home/resultado']);
  }

  private calcularTotal(): number {
    const values = this.sarcFForm.value;
    return (
      +values.strength +
      +values.walking +
      +values.chair +
      +values.stairs +
      +values.falls
    );
  }
}
