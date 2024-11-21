import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FLOAT } from 'html2canvas/dist/types/css/property-descriptors/float';

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
  porcentaje: FLOAT = 0.0;

  constructor(private router: Router, private route: ActivatedRoute) {
    //const navigation = this.router.getCurrentNavigation();
    //this.encuestas = navigation?.extras.state?.['encuestas'] || [];
  }

  ngOnInit(): void {
    // Recupera los datos enviados desde el componente encuesta
    this.route.queryParams.subscribe(params => {
      this.puntaje = params['puntaje'] || 0;  // Si no hay puntos, se asigna 0
      this.nombreEncuesta = params['nameEncuesta'] || '';
      this.porcentaje = params['porcentaje'] || '';
      this.observacion = params['observacion'] || '';
    });

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