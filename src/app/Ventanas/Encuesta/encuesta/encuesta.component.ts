import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ApiService } from 'src/app/Service/api.service';
import { categoria } from 'src/app/Shared/Data';
import { EncuestaCogComponent } from '../../Diagnosticos/Cognitiva/encuesta-cog/encuesta-cog.component';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.scss']
})

export class EncuestaComponent implements OnInit, OnDestroy{
  //Recibe Parametro ENtrante del Componente
  @ViewChild('encuestaComponent') encuestaComponent!: EncuestaCogComponent;

  name?: String;
  categoria?: String;
  public link: categoria={'name': ''};
  public safeUrl!: SafeResourceUrl;
  private  BaseURL?: String = 'http://localhost:4200/'; //URL Fijo  

  constructor(private router: Router, private encuestaService: ApiService, private route: ActivatedRoute, private sanitazer: DomSanitizer) {
    
  }

  ngOnInit(): void {
    // Obtener el parámetro 'categoria' desde la URL (URL Dinamica)
      this.categoria = this.route.snapshot.paramMap.get('categoria')!;
    
      // Recibir en nombre Clave del componente Diagnostico 
      this.encuestaService.selectEncuest$.subscribe(encuesta => {
        this.name = encuesta; //Recibe Name la clave de encuesta
        console.log(`Categoria recibida en EncuestaComponent: ${this.name}`); // Debug
        
      });
      
  }

  ngOnDestroy(): void {
    localStorage.removeItem('subCatSeleccionada'); // Limpia selección
  }

  cambiarCategoria(categoria: string) {
    this.encuestaComponent.actualizarEncuesta(categoria);
    this.name = categoria;
  }
}
