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
  imagePath: string | null = null; // Escala de Puntuacion en Imagen
  showImage: boolean = true; // Booleano para controlar la visibilidad
  ruta: string = 'assets/Imagenes/Puntaje/'; //Ruta de la carpeta
  file: string[] = ['', 'cog', 'afc', 'fun', 'nut']; // Asignar array de carpetas que continene posicion 0 = '';
  inNumber: number = 0;
  private url: string = '';

  constructor(private router: Router, private route: ActivatedRoute, private sharedService: SharedService) {
    //const navigation = this.router.getCurrentNavigation();
    //this.encuestas = navigation?.extras.state?.['encuestas'] || [];
  }

  ngOnInit(): void {
    this.sharedService.currentNumber.subscribe(number => {
      this.updateImage(number.mainCategory, number.subCategory);
      this.inNumber = number.mainCategory;
    });

     // Obtener los puntos desde los queryParams
     if(this.inNumber != 0){
       this.route.queryParams.subscribe(params => {
        this.puntaje = params['puntaje'] || '0';  // Si no hay puntos, se asigna 0
        this.nombreEncuesta = params['nameEncuesta'] || '';
        this.porcentaje = params['porcentaje'] || '';
        this.observacion = params['observacion'] || '';
        this.entrada = params['entrada'] || 'pto';
      });
     }

    console.log(this.imagePath);
  }

  ngOnDestroy(): void {
      localStorage.removeItem('categorySelection');
      // Restablecer valores al salir del componente
      this.puntaje = '0';
      this.nombreEncuesta = 'Default';
      this.porcentaje = 0;
      this.observacion = 'none';
      this.entrada = 'pto';
      window.location.reload();
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
    switch(cat){
      case 1:
        switch(subc){
          case 1:
            this.imagePath = this.sectionImage(cat, '4at');
          break;
          case 4:
            //this.imagePath = this.ruta + this.file[subc] + '/awol.png';
            this.imagePath = this.sectionImage(cat, 'awol'); //Llamar metodo para asignar url de la imagen
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
            this.imagePath = null;
            this.showImage = false;
            break;
        }
        break;
      case 2:
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
        this.imagePath = null;
        this.showImage = false;
        break;
    }
  }

  /* Selecciona la imagen de la carpeta, si no recibe por defecto es 0 */
  sectionImage(categoria: number = 0, imagen: string):string{
    return this.ruta + this.file[categoria] + '/' + imagen + '.png';
  }
}