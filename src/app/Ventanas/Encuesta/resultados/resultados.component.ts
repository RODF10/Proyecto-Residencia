import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss']
})
export class ResultadosComponent {
  encuestas: any[];

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.encuestas = navigation?.extras.state?.['encuestas'] || [];
  }
}