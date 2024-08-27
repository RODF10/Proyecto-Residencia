import { Component } from '@angular/core';

@Component({
  selector: 'app-diagnostic',
  templateUrl: './diagnostic.component.html',
  styleUrls: ['./diagnostic.component.scss']
})
export class DiagnosticComponent {
  e: String = 'Esfera';
  categoria = [
    { title: this.e +' Cognitiva', content: 'Contenido de la Categoría 1', cont1: '4AT', cont2: 'CAM', cont3: 'CAM-ICU', cont4: 'AWOL', cont5: 'Mini-COg' },
    { title: this.e +' Afectiva', content: 'Contenido de la Categoría 2', cont1: 'GDS-15', cont2: 'PHQ9', cont3: 'GAI-SF', cont4: 'Inventario de Ansiedad de Beck', cont5: 'Escala de Soledad de 3 elementos' },
    { title: this.e +' Funcional', content: 'Contenido de la Categoría 3', cont1: 'Katz', cont2: 'Indice de Barthel', cont3: 'Lawton y Brody', cont4: 'FRAIL', cont5: 'Criterio de Ensured' },
  ];

  constructor(){}

  selectedCategoryIndex: number | null = null;

  toggleCategoryIndex(index: number){
    if (this.selectedCategoryIndex === index) {
      this.selectedCategoryIndex = null; // Cerrar si se vuelve a hacer clic en la misma categoría
    } else {
      this.selectedCategoryIndex = index;
    }
  }

}
