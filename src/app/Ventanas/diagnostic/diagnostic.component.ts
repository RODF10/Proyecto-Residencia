import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'app-diagnostic',
  templateUrl: './diagnostic.component.html',
  styleUrls: ['./diagnostic.component.scss']
})
export class DiagnosticComponent implements OnInit, OnDestroy{
  //Salida de Datos del Componente
  @Output() categoriaSeleccionada = new EventEmitter<String>();

  //Nombre de las Categorias
  ec: String = 'Esfera Cognitiva'; sub: String = "Subcategoria:"; ea: String = "Esfera Afectiva"; ef: String = "Esfera Funcional"; en: String = "Esfera Nutricional";
  selectedCategoryIndex: number | null = null;

  //Lista de la Categoria a Mostrar
  categoria = [
    { title: this.ec.toUpperCase(), cat: 1, content: this.sub + ' ' + this.ec, cont1: '4AT', cont2: 'CAM', cont3: 'CAM-ICU', cont4: 'AWOL', cont5: 'SPMSQP', cont6: 'Prueba del Reloj' },
    { title: this.ea.toUpperCase(), cat: 2, content: this.sub + ' ' + this.ea, 
      cont1: 'GDS-15', cont2: 'CES-D7', cont3: 'PHQ9', cont4: 'GAI-SF', cont5: 'Inventario Ansiedad Beck', cont6: 'Escala Soledad 3 Elementos', cont7: 'Riesgo de Suicidio SAD PERSON', cont8: 'Escala Cornell', cont9:'Corta Depresion por Observacion' },
    { title: this.ef.toUpperCase(), cat: 3, content: this.sub + ' ' + this.ef, cont1: 'KATZ', cont2: 'Indice Barthel', cont3: 'Lawton y Brody', cont4: 'FRAIL', cont5: 'Criterios Ensrud', cont6: 'Time UP and Go' },
    { title: this.en.toUpperCase(), cat: 4, content: this.sub + ' ' + this.en, cont1:'Mini Nutritional Assessment SF', cont2:'Mini Nutritional Assessment', cont3:'MUST', cont4:'Criterios Glim', cont5:'Sarc-F',cont6:'EAT-10'},
  ];
  constructor(private router: Router, private serviceApi: ApiService){}

  ngOnInit(): void {
      // Bloquea el clic derecho en toda la página
    document.addEventListener('contextmenu', this.disableRightClick);
  }

  // Función que evita el clic derecho
  disableRightClick(event: MouseEvent) {
    event.preventDefault();
  }
  ngOnDestroy(): void {
    // Eliminar el listener al destruir el componente
    document.removeEventListener('contextmenu', this.disableRightClick);
  }

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
            //this.cambiarCategoria(this.ec.toLowerCase()+'-4at.php');
            this.cambiarCategoria(this.url(this.ec,'4at')); //Enviar tipo URL
            this.seleccionarSubCategoria('4at'); //Enciat nombre (Clave) para cada encuesta
            break;
          case 2:
            // this.cambiarCategoria(this.ec.toLowerCase() +'-cam.php');
            this.cambiarCategoria(this.url(this.ec,'cam'))
            this.seleccionarSubCategoria('cam');
            break;
          case 3:
            this.cambiarCategoria(this.url(this.ec,'cam-icu'));
            this.seleccionarSubCategoria('camicu');
            break;
          case 4:
            this.cambiarCategoria(this.url(this.ec,'awol'));
            this.seleccionarSubCategoria('awol');
            break;
          case 5:
            this.cambiarCategoria(this.url(this.ec,'spmsqp'));
            this.seleccionarSubCategoria('spmsqp');
            break;
          case 6:
            this.cambiarCategoria(this.url(this.ec,'prueba-reloj'));
            this.seleccionarSubCategoria('reloj');
            break;
        }
        break;
      case 2:
        this.seleccionarCategoria('afectiva');
        // this.seleccionarSubCategoria('Undefinied');
        switch(s){
          case 1:
            this.cambiarCategoria(this.url(this.ea,'gds-15'));
            this.seleccionarSubCategoria('gds15');
            break;
          case 2:
            this.cambiarCategoria(this.url(this.ea,'ces-d7-depresion-epidemioloicos'));
            this.seleccionarSubCategoria('cesd7');
            break;
          case 3:
            this.cambiarCategoria(this.url(this.ea,'phq9'));
            this.seleccionarSubCategoria('phq9');
            break;
          case 4:
            this.cambiarCategoria(this.url(this.ea, 'gai-sf'));
            this.seleccionarSubCategoria('gaisf');
            break;
          case 5:
            this.cambiarCategoria(this.url(this.ea, 'ansiedad-becky'));
            this.seleccionarSubCategoria('ansbeck');
            break;
          case 6:
            this.cambiarCategoria(this.url(this.ea, 'soledad-3-elementos'));
            this.seleccionarSubCategoria('soledad3');
            break;
          case 7:
            this.cambiarCategoria(this.url(this.ea, 'riesgo-suicido-sad-person'));
            this.seleccionarSubCategoria('sadperson');
            break;
          case 8:
            this.cambiarCategoria(this.url(this.ea,'escala-cornell'));
            this.seleccionarSubCategoria('cornell');
            break;
          case 9:
            this.cambiarCategoria(this.url(this.ea,'depresion-corta-okeeffe'));
            this.seleccionarSubCategoria('cortdepresion');
            break;
        }
        break;
      case 3:
        this.seleccionarCategoria('funcional');
        switch(s){
          case 1:
            this.cambiarCategoria(this.url(this.ef,'indice-katz'));
            this.seleccionarSubCategoria('katz');
            break;
          case 2:
            this.cambiarCategoria(this.url(this.ef,'indice-barthel'));
            this.seleccionarSubCategoria('barthel');
            break;
          case 3:
            this.cambiarCategoria(this.url(this.ef,'indice-lawton-y-brody'));
            this.seleccionarSubCategoria('lawton');
            break
          case 4:
            this.cambiarCategoria(this.url(this.ef, 'test-frail'));
            this.seleccionarSubCategoria('frail');
            break;
          case 5:
            this.cambiarCategoria(this.url(this.ef, 'criterios-ensrud'));
            this.seleccionarSubCategoria('ensrud');
            break;
          case 6:
            this.cambiarCategoria(this.url(this.ef, 'time-up-and-go'));
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

  url(esfera: String, url: string): string{
    return esfera.toLowerCase() + '-' + url + '.php';
  }
}
