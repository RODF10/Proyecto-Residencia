import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss']
})
export class ResultadosComponent implements OnInit{
  nombreEncuesta: string = ''; //Encuesta
  puntaje: string = ''; //Control del Puntaje
  observacion: string = ''; //Observacion
  porcentaje: number = 0;
  entrada: string = '';

  constructor(private router: Router, private route: ActivatedRoute) {
    //const navigation = this.router.getCurrentNavigation();
    //this.encuestas = navigation?.extras.state?.['encuestas'] || [];
  }

  ngOnInit(): void {
    // Obtener los puntos desde los queryParams
    this.route.queryParams.subscribe(params => {
      this.puntaje = params['puntaje'] || '0';  // Si no hay puntos, se asigna 0
      this.nombreEncuesta = params['nameEncuesta'] || '';
      this.porcentaje = params['porcentaje'] || '';
      this.observacion = params['observacion'] || '';
      this.entrada = params['entrada'] || 'pto';
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