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
    { title: this.e +' Cognitiva', cat: 1, content: 'Contenido de la Categoría 1', cont1: '4AT', cont2: 'CAM', cont3: 'CAM-ICU', cont4: 'AWOL', cont5: 'Mini-COg' },
    { title: this.e +' Afectiva', cat: 2, content: 'Contenido de la Categoría 2', cont1: 'GDS-15', cont2: 'PHQ9', cont3: 'GAI-SF', cont4: 'Inventario de Ansiedad de Beck', cont5: 'Escala de Soledad de 3 elementos' },
    { title: this.e +' Funcional', cat: 3, content: 'Contenido de la Categoría 3', cont1: 'Katz', cont2: 'Indice de Barthel', cont3: 'Lawton y Brody', cont4: 'FRAIL', cont5: 'Criterio de Ensured' },
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
