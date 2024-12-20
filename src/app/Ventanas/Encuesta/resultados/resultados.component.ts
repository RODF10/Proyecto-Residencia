import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/Service/shared.service';
import { UserService } from 'src/app/Service/user.service';
import { formatDate } from '@angular/common';
import { ApiService } from 'src/app/Service/api.service';
import { AlertService } from 'src/app/Service/alert.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss']
})
export class ResultadosComponent implements OnInit, OnDestroy{
  /* *********** DATOS DE ENVIO ******** */
  nombreEncuesta: string = '';
  puntaje: string = '';
  observacion: string = '';
  categoria: string = '';
  fecha: string = '';
  hora: string = '';
  doctorID: string = ''
  pacienteID: string = '';

  /* FUNCION DEL COMPONENTE */
  porcentaje: number = 0; //Porcentaje a Mostrar
  entrada: string = ''; // Marca si son Puntos, Segundos, Libras u otra manera de calcualar
  imagePath: string | null = null; // URL de la imagen
  showImage: boolean = true; // Booleano para controlar la visibilidad
  ruta: string = 'assets/Imagenes/Puntaje/'; //Ruta de la carpeta
  file: string[] = ['', 'cog', 'afc', 'fun', 'nut']; // Asignar array de carpetas que continene posicion 0 = '';
  inNumber: number = 0;

  constructor(private router: Router, private route: ActivatedRoute, private sharedService: SharedService, private user: UserService, private apiService: ApiService, private aler: AlertService) { }

  ngOnInit(): void {
    // Establecer fecha y hora actuales
    const currentDate = new Date();
    this.fecha = formatDate(currentDate, 'yyyy-MM-dd', 'en-US');  // Formato de fecha
    this.hora = formatDate(currentDate, 'HH:mm:ss', 'en-US');    // Formato de hora

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

    const resultado = {
      number_imss: localStorage.getItem('patient_id'),
      doctor_id: this.user.getDoctorId(),
      diagnostic_id: this.inNumber,
      encuesta: this.nombreEncuesta,
      puntos: this.puntaje,
      observacion: this.observacion,
      fecha: this.fecha,
      hora:this.hora
    }
    this.apiService.enviarResultado(resultado).subscribe(
      (response) =>{
        console.log(resultado);
        this.aler.success('Datos Capturados del Paciente', 'Envio de Datos');
      }, (error) => {
        this.aler.error('Hubo problemas al enviar los datos', 'Error de Entrada');
        console.log('Error de envio: ', error);
      }
    );
    console.log(resultado);
    console.log(this.imagePath);
  }

  ngOnDestroy(): void {
      localStorage.removeItem('categorySelection');
      localStorage.removeItem('patient_id');
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
          case 4:
            this.imagePath = this.sectionImage(cat, 'frail');
            break;
          case 5:
            this.imagePath = this.sectionImage(cat, 'ensrud');
            break;
          case 6:
            this.imagePath = this.sectionImage(cat,'time');
            break;
          case 7:
            this.imagePath = this.sectionImage(cat, 'sppb');
            break;
          case 8:
            this.imagePath = this.sectionImage(cat, 'marcha');
            break;
          case 9:
            this.imagePath = this.sectionImage(cat, 'hospitalizar');
            break;
          default:
            this.resetImage();
            break;
        }
        break;
      case 4:
        switch(subc){
          case 1:
            this.imagePath = this.sectionImage(cat, 'minisf');
            break;
          case 2:
            this.imagePath = this.sectionImage(cat, 'nutricional');
            break;
          case 3:
            this.imagePath = this.sectionImage(cat, 'must');
            break;
          case 5:
            this.imagePath = this.sectionImage(cat, 'sarf');
            break;
          case 6:
            this.imagePath = this.sectionImage(cat,'eat');
            break;
          case 7:
            this.imagePath = this.sectionImage(cat, '');
            break;
          case 8:
            this.imagePath = this.sectionImage(cat, '');
            break;
          case 9:
            this.imagePath = this.sectionImage(cat, '');
            break;
          default:
            this.resetImage();
            break;
        }
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