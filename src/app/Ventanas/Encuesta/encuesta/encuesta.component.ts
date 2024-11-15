import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ApiService } from 'src/app/Service/api.service';
import { categoria } from 'src/app/Shared/Data';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.scss']
})

export class EncuestaComponent implements OnInit{
  name?: String;
  categoria?: String;
  public link: categoria={'name': ''};
  public safeUrl!: SafeResourceUrl;
  private  BaseURL?: String = ''; //URL Fijo  

  constructor(private router: Router, private encuestaService: ApiService, private route: ActivatedRoute, private sanitazer: DomSanitizer) {
    
  }

  ngOnInit(): void {
    // Obtener el parámetro 'categoria' desde la URL (URL Dinamica)
      this.categoria = this.route.snapshot.paramMap.get('categoria')!;
    
      // Recibir en nombre Clave del componente Diagnostico 
      this.encuestaService.selectEncuest$.subscribe(encuesta => {
        this.name = encuesta; //Recibe Name la clave de encuesta
        console.log(`Categoria recibida en Category1Component: ${this.name}`); // Debug
        
        this.mostrarEncuesta(this.name); //Lammar metodo de acuerdo al name recibido
        // this.link.name = encuesta;
      });
      console.log("Msj: "+this.link.name);//Imprime en consola
      // Construir la URL segura usando la encuesta como parte dinámica
      const URL = 'http://localhost:4200/encuesta-cog' + this.link.name;
      console.log(URL);
      this.safeUrl = this.sanitazer.bypassSecurityTrustResourceUrl(URL);
      
  }

  mostrarEncuesta(n: String){
    switch(n){
      case '4at':
        this.link.name = 'encuesta-cog';
        break;  
      defaul:
        this.link.name = 'Hola';
        break;
    }
  }
}
