import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { float, FLOAT } from 'html2canvas/dist/types/css/property-descriptors/float';
import { ApiService } from 'src/app/Service/api.service';
import { PreguntaDosOpc } from 'src/app/Shared/Data';

@Component({
  selector: 'app-encuesta-cog',
  templateUrl: './encuesta-cog.component.html',
  styleUrls: ['./encuesta-cog.component.scss']
})
export class EncuestaCogComponent implements OnInit{
  isSelected: { [key: string]: boolean } = {};
  puntos: number = 0; //Puntaje
  caregoria: String = 'Undefinid';//Recibir nombre clave
  totalPreguntas: number = 9;
  nameEncuesta?: String;
  observacion: String ='';

  preguntasCamIcu: PreguntaDosOpc[] = [
    {texto: 'Existencia de Cambio agudo del Estado Mental', respuesta:''},
    {texto: 'Estado Mental del Paciente ha fluctuado durante las últimas 24hrs', respuesta:''},
    {texto: 'Apretar Mano (Médico) cuando el paciente diga A', respuesta:''},
    {texto: 'Diga al Paciente que Deletree C-A-S-A-B-L-A-N-C-A', respuesta:''},
    {texto: 'Vigile al pacinete y verifique: Alerta de RASS0', respuesta:''},
    {texto: 'Las Piedras flotan en el Agua', respuesta:''},
    { texto: 'Hay Peces en el mar', respuesta: '' },
    { texto: '1kg pesa más que 2kg', respuesta: '' },
    { texto: 'Los martillos sirven para poner clavos', respuesta: '' }
  ] //Preguntas del SI o NO
  showErrors= false;

  constructor(private router: Router, private categoriaEncuestaComponenet: ApiService){

  }

  ngOnInit(): void {
      this.categoriaEncuestaComponenet.selectEncuest$.subscribe(subCategoria => { 
        this.caregoria = subCategoria;
      });
      console.log(this.caregoria)
  }

  // Función para alternar el color
  toggleTextColor(textKey: string): void {
    this.isSelected[textKey] = !this.isSelected[textKey];

    //Al estar en color se suma 1 punto, en caso contrario 0
    if (this.isSelected[textKey]) {
      this.puntos += 1;  // Si se selecciona, suma un punto
    } else {
      this.puntos -= 1;  // Si se deselecciona, resta un punto
    }
  }
  //Metodo del boton Finalizar
  finalizarEncuesta(){
    this.encuestas('camicu');
   
  }
  
  //Receptaculo Categoria
  actualizarEncuesta(encuestaS: String){
    this.caregoria = encuestaS;
  }

  encuestaResulto(puntos: number, nameEncuesta: String, observacion: String, porcentaje: FLOAT){
     if(this.showErrors){
      // Al navegar, enviamos los puntos al componente de resultado
      this.router.navigate(['home/resultado'], {queryParams: {
        puntaje: puntos, //Puntaje Obtenido
        nameEncuesta: nameEncuesta, //Nombre de la Encuesta
        porcentaje: porcentaje.toFixed(2),
        observacion: observacion //Observaciones
      }});
      localStorage.removeItem('subCatSeleccionada'); 
    }
  }

  /* METODOS DE LAS ENCUESTAS PARA CALCULAR LOS PUNTOS OBTENIDO */
  encuestas(enc: String){
    switch(enc){
      case 'camicu':
        console.log('Entrastes en: ' + this.caregoria);
        const todasRespondidas = this.preguntasCamIcu.every(p => p.respuesta !== null && p.respuesta !== undefined && p.respuesta !== '');
        console.log(todasRespondidas); 
        
        if (!todasRespondidas) {
          // Mostrar errores si hay preguntas sin responder
          this.showErrors = true;
          return;
        } else{ this.showErrors = true}
        let puntajeSi = 0;
        for (const pregunta of this.preguntasCamIcu) {
          if (pregunta.respuesta == 'si') {
            puntajeSi++;
          }
        }

        this.encuestaResulto(puntajeSi, 'CAM-ICU','Sin observaciones',(puntajeSi/9)*100);
        console.log('Salida CAM-ICU');
        break;
      case 'awol':
        var del: String = 'Riesgo de Delirium: ';
        console.log('Entrastes en: ' + this.caregoria);
        if (this.puntos >= 4) {
          this.observacion = del + '64%';
        } else if (this.puntos == 3) {
          this.observacion = del + '20%';
        } else if (this.puntos == 2) {  
          this.observacion = del + '14%';
        } else if(this.puntos == 1){
          this.observacion = del + '4%';
        } else {
          this.observacion = del + '2%';
        }
        this.showErrors = true;
        console.log('Salida 4AT');
        this.encuestaResulto(this.puntos, '4AT', this.observacion, (this.puntos/4)/100);
        break;
    }

  }

}
