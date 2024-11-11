import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-diagnostic',
  templateUrl: './diagnostic.component.html',
  styleUrls: ['./diagnostic.component.scss']
})
export class DiagnosticComponent {
  e: String = 'Esfera';
  categoria = [
    { title: ' FUNCIONALIDAD', cat: 1, content: 'Contenido de la Categoría 1', cont1: 'Indice de Barthel', cont2: 'Indice de Kartz', cont3: 'Lawton y Brody', cont4: '', cont5: '' },
    { title: ' PSICOAFECTIVA', cat: 2, content: 'Contenido de la Categoría 2', cont1: 'MMSE Folsen', cont2: 'Prueba de Dibujo', cont3: 'Escala Depresion', cont4: 'Corta Presion', cont5: 'Gravedad Insomio' },
    { title: ' SOCIO FAMILIAR', cat: 3, content: 'Contenido de la Categoría 3', cont1: 'Sobrecarga Zarit', cont2: 'Valoracion socio-familiar', cont3: 'Sospecha de maltrato', cont4: 'Detección de anciano de riesgo', cont5: 'Recursos sociales Diaz y Vega' },
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
            this.router.navigate(['login/esfera-cognitiva']);
            break;
          case 2:
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

}
