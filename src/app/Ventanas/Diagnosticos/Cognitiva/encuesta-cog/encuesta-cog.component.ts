import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { left } from '@popperjs/core';
import { float, FLOAT } from 'html2canvas/dist/types/css/property-descriptors/float';
import { ApiService } from 'src/app/Service/api.service';
import { PreguntaDosOpc } from 'src/app/Shared/Data';

@Component({
  selector: 'app-encuesta-cog',
  templateUrl: './encuesta-cog.component.html',
  styleUrls: ['./encuesta-cog.component.scss']
})
export class EncuestaCogComponent implements OnInit{
  isSelected: { [key: string]: boolean } = {};// Validacion de color de AWOL false/true
  puntos: number = 0; //Puntaje
  categoria: String = 'Undefinid';//Recibir nombre clave
  cons: String[] = ['Entrastes en: ', 'Salida de: '];
  nameEncuesta?: String;
  observacion: String ='';

  //Preguntas Si No
  preguntasCamIcu: PreguntaDosOpc[] = [
    {texto: 'Existencia de Cambio agudo del Estado Mental', respuesta:''},
    {texto: 'Estado Mental del Paciente ha fluctuado durante las últimas 24hrs', respuesta:''},
    {texto: 'Apretar Mano (Médico) cuando el paciente diga A', respuesta:''},
    {texto: 'Diga al Paciente que Deletree C-A-S-A-B-L-A-N-C-A', respuesta:''},
    {texto: 'Vigile al pacinete y verifique: Alerta de RASS0', respuesta:''},
    {texto: 'Las Piedras flotan en el Agua', respuesta:''},
    {texto: 'Hay Peces en el mar', respuesta: '' },
    {texto: '1kg pesa más que 2kg', respuesta: '' },
    {texto: 'Los martillos sirven para poner clavos', respuesta: '' }
  ]
  preguntasMMSE: PreguntaDosOpc[] = [
    {texto: 'Que fecha es hoy (dia, mes, año)', respuesta:''},
    {texto: 'Que dia de la semana es hoy', respuesta:''},
    {texto: 'Donde estamos ahora (Lugar o Edificio)', respuesta:''},
    {texto: 'Cual es su numero de telefono (O idreccion si no tiene uno)', respuesta:''},
    {texto: 'Que edad tiene', respuesta:''},
    {texto: 'La fecha cuando nacio', respuesta:''},
    {texto: 'Como se llama el presidente del Gobierno', respuesta: '' },
    {texto: 'Como se llama el anterior presidente', respuesta: '' },
    {texto: 'Primer apellido de su Madre', respuesta: '' },
    {texto: 'Pudo restar de tres en tres desde veite', respuesta: ''}
  ]
  showErrors= false;

  constructor(private router: Router, private categoriaEncuestaComponenet: ApiService){

  }

  ngOnInit(): void {
      this.categoriaEncuestaComponenet.selectEncuest$.subscribe(subCategoria => { 
        this.categoria = subCategoria;
      });
      console.log(this.categoria)
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
    this.encuestas(this.categoria);// Entrar a la encuesta segun sea seleccionada
   
  }
  
  //Receptaculo Categoria
  actualizarEncuesta(encuestaS: String){
    this.categoria = encuestaS;
  }

  //Envia los parametros al Componente Resultado segun reciba
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
        console.log(this.cons[0], this.categoria);
        const todasRespondidas = this.preguntasCamIcu.every(p => p.respuesta != null && p.respuesta != undefined && p.respuesta != '');
        console.log('Preguntas CAM-ICU: '+ todasRespondidas); 
        
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
        console.log(this.cons[1], 'CAM-ICU');
        break;
      case 'awol':
        var del: String = 'Riesgo de Delirium: '; //Validacion riesgo
        console.log(this.cons[0], this.categoria); //Verificar si funciona en consola
        //Calcular la observacion segun el puntaje
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

        this.showErrors = true;// An finalizar marca verdadero si, dependiendo si selecciona la letra
        console.log(this.cons[1], 'AWL');//Verificar que si hay salida
        this.encuestaResulto(this.puntos, '4AT', this.observacion, (this.puntos/4)/100); //Envia los parametros al metodo
        break;
      case 'spmsqp':
        var err: String = 'Errores Obtenido: ';//Acortar observacion
        console.log(this.cons[0], this.categoria);
        const questionAll = this.preguntasMMSE.every(p => p.respuesta != null && p.respuesta != undefined && p.respuesta != '');// No se acepta respuestas sin responder
        console.log('Pregunats MMSE: '+ questionAll);
        //Validar que todas las opciones sean seleccionadas
        if(!questionAll){
          this.showErrors = true;
          return;
        } else { this.showErrors = true}
        // Sumar si el puntaje es Si
        let respuestaNo = 0;
        for(const pregunta of this.preguntasMMSE){
          if(pregunta.respuesta == 'no'){
            respuestaNo++;
          }
        }
        //Calculo de observacion segun el puntaje
        if(respuestaNo >= 8){
          this.observacion = err + 'Importante, deterioro Congnitivo';
        } else if(respuestaNo >= 5 && respuestaNo <= 7){
          this.observacion = err + 'Moderado, Deteriodocognitivo, patologico';
        } else if(respuestaNo <= 2){
          this.observacion = err + 'Normal, Sin deteriodo'
        } else {
          this.observacion = err + 'Leve, Deteriodo cognitivo'
        }

        this.encuestaResulto(respuestaNo, 'Question Pfeiffer', this.observacion, (respuestaNo/10)*100); //Envio de los parametros
        console.log(this.cons[1], 'spmsqp');
        break;
    }

  }

}
