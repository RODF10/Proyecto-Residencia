import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss']
})
export class ResultadosComponent implements OnInit{
  /*@Input() nombreEncuesta: String = '';
  @Input() puntajeTotal: number = 0;
  @Input() observacion: String = '';*/

  nombreEncuesta: string = '';
  puntaje: number = 0;
  observacion: string = '';

  constructor(private router: Router) {
    //const navigation = this.router.getCurrentNavigation();
    //this.encuestas = navigation?.extras.state?.['encuestas'] || [];
  }

  ngOnInit(): void {
    // Recupera los datos enviados desde el componente encuesta
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      const { nombreEncuesta, puntaje, observacion } = navigation.extras.state;
      this.nombreEncuesta = nombreEncuesta;
      this.puntaje = puntaje;
      this.observacion = observacion;
    }
  }

  funcionBoton(n: number): void{
    switch(n){
      case 1:
        this.router.navigate(['home/encuesta-cog']);
        break;
      case 2:
        this.router.navigate(['home/diagnostic']);
        break;
      case 3:
        this.router.navigate(['home/encuesta-afc']);
        break;
    }
  }
}