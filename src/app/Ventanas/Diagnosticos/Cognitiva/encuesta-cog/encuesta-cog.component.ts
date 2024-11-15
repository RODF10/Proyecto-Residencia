import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'app-encuesta-cog',
  templateUrl: './encuesta-cog.component.html',
  styleUrls: ['./encuesta-cog.component.scss']
})
export class EncuestaCogComponent implements OnInit{
  isSelected: { [key: string]: boolean } = {};
  caregoria: String = 'Undefinid';

  constructor(private router: Router, private categoriaEncuestaComponenet: ApiService){

  }

  ngOnInit(): void {
      this.categoriaEncuestaComponenet.selectEncuest$.subscribe(subCategoria => { 
        this.caregoria = subCategoria;
      });
  }

  // Función para alternar el color
  toggleTextColor(textKey: string): void {
    this.isSelected[textKey] = !this.isSelected[textKey];
  }

  finalizarEncuesta(){
    this.router.navigate(['home/resultado']);
  }

  actualizarEncuesta(encuestaS: String){
    this.caregoria = encuestaS;
  }

}
