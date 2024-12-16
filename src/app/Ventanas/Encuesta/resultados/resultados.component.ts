import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/Service/shared.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss']
})
export class ResultadosComponent implements OnInit, OnDestroy{
  nombreEncuesta: string = ''; //Encuesta
  puntaje: string = ''; //Control del Puntaje
  observacion: string = ''; //Observacion
  porcentaje: number = 0; //Porcentaje a Mostrar
  entrada: string = ''; // Marca si son Puntos, Segundos, Libras u otra manera de calcualar
  imagePath: string | null = null; // URL de la imagen
  showImage: boolean = true; // Booleano para controlar la visibilidad
  ruta: string = 'assets/Imagenes/Puntaje/'; //Ruta de la carpeta
  file: string[] = ['', 'cog', 'afc', 'fun', 'nut']; // Asignar array de carpetas que continene posicion 0 = '';
  inNumber: number = 0;

  constructor(private router: Router, private route: ActivatedRoute, private sharedService: SharedService) { }

  ngOnInit(): void {
    // Recibe los datos del componente sin usar this.router.queryParam y mantener limpia la url
    const resultados = this.sharedService.getStoredResults();

    this.sharedService.currentNumber.subscribe(number => {
      this.updateImage(number.mainCategory, number.subCategory);
      this.inNumber = number.mainCategory; // Asignar categoria para mostrar parametros recibidos
    });
    
     // Obtener los puntos desde los queryParams al recibir un numero difernete de 0
    if(this.inNumber != 0){      
      this.nombreEncuesta = resultados.encuesta;
      this.puntaje = resultados.point;
      this.observacion = resultados.observable;
      this.porcentaje = resultados.porcent;
      this.entrada = resultados.ent ?? 'pto';
    } else {
        // Restablecer valores al salir del componente
        this.puntaje = 'none';
        this.nombreEncuesta = 'Default';
        this.porcentaje = 0;
        this.observacion = 'none';
        this.entrada = 'undefiend';
    }

    console.log(this.imagePath);
  }

  ngOnDestroy(): void {
      localStorage.removeItem('categorySelection');
      window.location.reload();
      this.sharedService.clearResults();
  }

  funcionBoton(n: number): void{
    switch(n){
      case 1:
        this.router.navigate(['home/encuesta-cog']);
        break;
      case 2:
        this.router.navigate(['home/diagnostic']);
        break;
      case 3:
        this.router.navigate(['home/encuesta-afc']);
        break;
    }
  }

  // Recibe el numero en Servicios para mostrar imagen
  updateImage(cat: number, subc: number) {
    //console.log('Categoria: '+cat, + '\nSubcategoria: '+subc);
    switch(cat){
      case 1:
        switch(subc){
          case 1:
            this.imagePath = this.sectionImage(cat, '4at');
          break;
          case 4:
            /* this.imagePath = this.ruta + this.file[subc] + '/awol.png';
              categoria = POr defecto se recibe en DiagnosticComponent */
            this.imagePath = this.sectionImage(cat, 'awol'); //Llamar metodo para asignar url de la imagen (categoria, nombreimagen)
            break;
          case 5:
            this.imagePath = this.sectionImage(cat, 'spmsqp');
            break;
          case 6:
            this.imagePath = this.sectionImage(cat, 'reloj');
            break;
          case 7:
            this.imagePath = this.sectionImage(cat, 'minicog');
            break;
          default:
            this.resetImage();
            break;
        }
        break;
      case 2:
        switch(subc){
          case 1:
            this.imagePath = this.sectionImage(cat, 'gds15');
            break;
          case 2:
            this.imagePath = this.sectionImage(cat, 'cesd7');
            break;
          case 3:
            this.imagePath = this.sectionImage(cat, 'phq9');
            break;
          case 4:
            this.imagePath = this.sectionImage(cat, 'gaisf');
            break;
          case 5:
            this.imagePath = this.sectionImage(cat, 'beck');
            break;
          case 6:
            this.imagePath = this.sectionImage(cat, 'escala');
            break;
          case 7:
            this.imagePath = this.sectionImage(cat, 'sadperson');
            break;
          case 8:
            this.imagePath = this.sectionImage(cat, 'cornell');
            break;
          case 9:
            this.imagePath = this.sectionImage(cat, 'depresionc');
            break;
        }
        break;    
      case 3:
        switch(subc){
          case 1:
            this.imagePath = this.sectionImage(cat, 'katz');
            break;
          case 2:
            this.imagePath = this.sectionImage(cat, 'barthel');
            break;
          case 3:
            this.imagePath = this.sectionImage(cat, 'lawton');
            break;
        }
        break;
      case 4:
        break;
      default:
        // this.imagePath =  'assets/Imagenes/Puntaje/cog/awol.png';
        this.resetImage();
        break;
    }
  }

  /* Selecciona la imagen de la carpeta, si no recibe por defecto es 0 */
  sectionImage(categoria: number = 0, imagen: string):string{
    /*
     * ruta = Acceso a la carpeta de Puntaje
     * file[x] = acceso a la carpeta de la categoria
     * imagen = Receptor de nombre de la imagen
    */
    return this.ruta + this.file[categoria] + '/' + imagen + '.png';
  }

  resetImage(){
      this.imagePath = null;
      this.showImage = false;
  }
}