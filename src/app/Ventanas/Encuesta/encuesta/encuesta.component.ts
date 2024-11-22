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

  name?: String; //Nombre Categoria
  categoria?: String; // Guardar Categoria
  public safeUrl!: SafeResourceUrl;
  private  BaseURL?: String = 'http://localhost:4200/'; //URL Fijo  

  constructor(private router: Router, private serviceApi: ApiService, private route: ActivatedRoute, private sanitazer: DomSanitizer) {
    
  }

  ngOnInit(): void {
    // Obtener el parámetro 'categoria' desde la URL (URL Dinamica)
      this.categoria = this.route.snapshot.paramMap.get('categoria')!;
    
      // Recibir en nombre Clave del componente Diagnostico 
      this.serviceApi.categoriaSeleccionada$.subscribe(cat => {
        this.categoria = cat; //Recibe clave de Categoria
        this.updateTitle(cat);
        console.log(`Categoria recibida en EncuestaComponent: ${this.categoria,' | ', cat}`); // Debug
      });
      
  }

  ngOnDestroy(): void {
    localStorage.removeItem('subCatSeleccionada'); // Limpia selección
    localStorage.removeItem('categoriaSeleccionada')
  }

  cambiarCategoria(categoria: string) {
    this.encuestaComponent.actualizarEncuesta(categoria);
    this.name = categoria;
  }

  updateTitle(categoria: String): void{
    switch (categoria) {
      case 'cognitiva':
        this.name = 'COGNITIVA';
        break;
      case 'afectiva':
        this.name = 'AFECTIVA';
        break;
      case 'funcional':
        this.name = 'FUNCIONAL';
        break;
      default:
        this.name = 'None'; // Valor predeterminado
        break;
    }
  }
}
