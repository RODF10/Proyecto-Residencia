import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'app-diagnostic',
  templateUrl: './diagnostic.component.html',
  styleUrls: ['./diagnostic.component.scss']
})
export class DiagnosticComponent {
  //Salida de Datos del Componente
  @Output() categoriaSeleccionada = new EventEmitter<String>();

  //Nombre de las Categorias
  ec: String = 'Esfera Cognitiva'; sub: String = "Subcategoria:"; ea: String = "Esfera Afectiva"; ef: String = "Esfera Funcional"; en: String = "Esfera Nutricional";
  //Otros
  //f: String = 'FUNCIONALIDAD'; p: String = 'PSICOAFECTIVA'; sf: String = 'SOCIO FAMILIAR';
  //Lista de la Categoria a Mostrar
  categoria = [
    { title: this.ec.toUpperCase(), cat: 1, content: this.sub + ' ' + this.ec, cont1: '4AT', cont2: 'CAM', cont3: 'CAM-ICU', cont4: 'AWOL', cont5: 'SPMSQP', cont6: 'Prueba del Reloj' },
    { title: this.ea.toUpperCase(), cat: 2, content: this.sub + ' ' + this.ea, cont1: 'GDS-15', cont2: 'CES-D7', cont3: 'PHQ9', cont4: 'GAI-SF', cont5: 'Inventario Ansiedad Beck', cont6: 'Escala Soledad 3 Elementos' },
    { title: this.ef.toUpperCase(), cat: 3, content: this.sub + ' ' + this.ef, cont1: 'KATZ', cont2: 'Indice Barthel', cont3: 'Lawton y Brody', cont4: 'FRAIL', cont5: 'Criterios Ensrud', cont6: 'Time UP and Go' },
  ];
  //Ignorar
  urlCat = [
    {URL: 'funcionalidad'},
    {URL: 'psicoafectiva'}
  ];

  constructor(private router: Router, private serviceApi: ApiService){}

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
        this.seleccionarCategoria('cognitiva');
        switch(s){
          case 1:
            //this.router.navigate(['home/encuesta/{categoria}']);
            this.cambiarCategoria(this.ec.toLowerCase()+'-4at.php'); //Enviar tipo URL
            this.seleccionarSubCategoria('4at'); //Enciat nombre (Clave) para cada encuesta
            break;
          case 2:
            this.cambiarCategoria(this.ec.toLowerCase() +'-cam.php');
            this.seleccionarSubCategoria('cam');
            break;
          case 3:
            this.cambiarCategoria(this.ec.toLowerCase() + 'cam-icu.php');
            this.seleccionarSubCategoria('camicu');
            break;
          case 4:
            this.cambiarCategoria(this.ec.toLowerCase()+'-awol.php');
            this.seleccionarSubCategoria('awol');
            break;
          case 5:
            this.cambiarCategoria(this.ec.toLowerCase() + 'spmsqp.php');
            this.seleccionarSubCategoria('spmsqp');
            break;
          case 6:
            this.cambiarCategoria(this.ec.toLowerCase()+ '-prueba-reloj.php');
            this.seleccionarSubCategoria('reloj');
            break;
        }
        break;
      case 2:
        this.seleccionarCategoria('afectiva');
        // this.seleccionarSubCategoria('Undefinied');
        switch(s){
          case 1:
            this.cambiarCategoria(this.ea.toLowerCase()+'gds-15.php');
            this.seleccionarSubCategoria('gds15');
            break;
          case 2:
            this.cambiarCategoria(this.ea.toLowerCase()+'ces-d7-depresion-epidemioloicos.php');
            this.seleccionarSubCategoria('cesd7');
            break;
          case 3:
            this.cambiarCategoria(this.ea.toLowerCase()+'phq9.php');
            this.seleccionarSubCategoria('phq9');
            break;
          case 4:
            this.cambiarCategoria(this.ea.toLowerCase()+'gai-sf.php');
            this.seleccionarSubCategoria('gaisf');
            break;
          case 5:
            this.cambiarCategoria(this.ea.toLowerCase()+'ansiedad-becky.php');
            this.seleccionarSubCategoria('ansbeck');
            break;
          case 6:
            this.cambiarCategoria(this.ea.toLowerCase()+'soledad-3-elementos.php');
            this.seleccionarSubCategoria('soledad3');
            break;
        }
        break;
      case 3:
        this.seleccionarCategoria('funcional');
        switch(s){
          case 1:
            this.cambiarCategoria(this.ef.toLowerCase()+'-katz.php');
            this.seleccionarSubCategoria('katz');
            break;
          case 2:
            this.cambiarCategoria(this.ef.toLowerCase()+'-indice-barthel.php')
            this.seleccionarSubCategoria('barthel');
            break;
          case 3:
            this.cambiarCategoria(this.ef.toLowerCase()+'-lawton-y-brody.php');
            this.seleccionarSubCategoria('lawton');
            break
          case 4:
            this.cambiarCategoria(this.ef.toLowerCase()+ '-frail.php');
            this.seleccionarSubCategoria('frail');
            break;
          case 5:
            this.cambiarCategoria(this.ef.toLowerCase()+ '-criterios-ensrud.php');
            this.seleccionarSubCategoria('ensrud');
            break;
          case 6:
            this.cambiarCategoria(this.ef.toLowerCase()+ '-time-up-and-go.php');
            this.seleccionarSubCategoria('timeup');
            break;
        }
        break;
    }
  }

  //URL Dinamica de acuerdo a la encuesta seleccionada
  cambiarCategoria(categoria: string): void {
    this.router.navigate([`home/encuesta/${categoria}`]);
  }

  //Selecciona el Nombre de la Encuesta
  seleccionarSubCategoria(encuesta: String){
    this.serviceApi.seleccionarEncuesta(encuesta);
    this.categoriaSeleccionada.emit(encuesta);
    localStorage.setItem('subCatSeleccionada', encuesta.toString());
    console.log(`Subcategoria seleccionada en DiagnosticComponent: ${encuesta}`); // Debug
  }

  seleccionarCategoria(categoria: string){
    this.serviceApi.seleccionarCategoria(categoria);
    console.log('Categoria recibida en EncuestaComponent: ',categoria)
  }
}
