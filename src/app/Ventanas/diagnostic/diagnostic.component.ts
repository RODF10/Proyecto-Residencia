import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-diagnostic',
  templateUrl: './diagnostic.component.html',
  styleUrls: ['./diagnostic.component.scss']
})
export class DiagnosticComponent {
  e: String = 'Esfera'; sub: String = "Subcategoria:";
  f: String = 'FUNCIONALIDAD'; p: String = 'PSICOAFECTIVA'; sf: String = 'SOCIO FAMILIAR';
  categoria = [
    { title: this.f, cat: 1, content: this.sub + ' ' + this.f, cont1: 'Indice de Barthel', cont2: 'Indice de Kartz', cont3: 'Lawton y Brody', cont4: '', cont5: '' },
    { title: this.p, cat: 2, content: this.sub + ' ' + this.p, cont1: 'MMSE Folsen', cont2: 'Prueba de Dibujo', cont3: 'Escala Depresion', cont4: 'Corta Presion', cont5: 'Gravedad Insomio' },
    { title: this.sf, cat: 3, content: this.sub + ' ' + this.sf, cont1: 'Sobrecarga Zarit', cont2: 'Valoracion socio-familiar', cont3: 'Sospecha de maltrato', cont4: 'Detección de anciano de riesgo', cont5: 'Recursos sociales Diaz y Vega' },
  ];
  urlCat = [
    {URL: 'funcionalidad'},
    {URL: 'psicoafectiva'}
  ];

  constructor(private router: Router){}

  selectedCategoryIndex: number | null = null;

  toggleCategoryIndex(index: number){
    if (this.selectedCategoryIndex === index) {
      this.selectedCategoryIndex = null; // Cerrar si se vuelve a hacer clic en la misma categoría
    } else {
      this.selectedCategoryIndex = index;
    }
  }

  vent(c: number, s: number) {
    console.log(c,s);
    switch(c){
      case 1:
        switch(s){
          case 1:
            //this.router.navigate(['home/encuesta/{categoria}']);
            this.cambiarCategoria(this.f+'-indice-barthel');
            break;
          case 2:
            this.cambiarCategoria(this.f +'indice-kartz');
            break;
          case 3:
            break;
          case 4:
            break;
          case 5:
            break;
        }
        break;
      case 2:
        break;
      case 3:
        break;
    }
  }

  cambiarCategoria(categoria: string): void {
    this.router.navigate([`/encuesta/${categoria}`]);
  }

}
