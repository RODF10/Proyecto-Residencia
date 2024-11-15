import { Component } from '@angular/core';

@Component({
  selector: 'app-encuesta-cog',
  templateUrl: './encuesta-cog.component.html',
  styleUrls: ['./encuesta-cog.component.scss']
})
export class EncuestaCogComponent {
  isSelected: { [key: string]: boolean } = {};

  // Función para alternar el color
  toggleTextColor(textKey: string): void {
    this.isSelected[textKey] = !this.isSelected[textKey];
  }

}
