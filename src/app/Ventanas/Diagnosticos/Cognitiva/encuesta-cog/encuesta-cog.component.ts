import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validator, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { left } from '@popperjs/core';
import { float, FLOAT } from 'html2canvas/dist/types/css/property-descriptors/float';
import { ApiService } from 'src/app/Service/api.service';
import { PreguntaDosOpc, Question } from 'src/app/Shared/Data';

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
  //Preguntas Reloj
  questionnaireForm: FormGroup;
  questions: Question[] = [
    { text: 'Dibujo del Reloj',
      options: [
        { label: 'El círculo está bien dibujado o cercanamente a lo redondo', score: 2 },
        { label: 'El círculo está dibujado, pero de manera irregular', score: 1 },
        { label: 'Figura irregular o no compatible con un semi-círculo', score: 0 }
      ]
    },
    { text: 'Presencia y secuencia de números',
      options: [
        { label: 'Todos los números están presentes. Puede aceptarse un error mínimo en la disposición espacial.', score: 4 },
        { label: 'Todos los números están presentes. Errores en la disposición espacial.', score: 3 },
        { label: 'Algunas de las Siguientes:\nNúmeros faltantes o adicionales aunque sin distorsiones groseras de los números restantes.\nLos números están ubicados en sentido anti-horario.\nLos números están presentes pero hay una seria alteración en la disposición general.', score: 2 },
        { label: 'Números faltantes o adicionales y errores espaciales serios', score: 1 },
        { label: 'Ausencia o pobre representación de los números.', score: 0 }
      ]
    },
    { text: 'Presencia y ubicación de las agujas',
      options: [
        { label: 'Las agujas están en la posición correcta y la diferencia en tamaño está respetada.', score: 4 },
        { label: 'Errores discretos en la representación de las agujas o la diferencia de tamaño entre las agujas.', score: 3 },
        { label: 'Errores mayores en la ubicación de las agujas (de manera significativa, incluyendo 10 a 11).', score: 2 },
        { label: 'Se dibuja solamente UNA aguja o el dibujo de ambas agujas es notoriamente pobre.', score: 1 },
        { label: 'No se dibujan las agujas o se dibujan varias de manera perseverativa.', score: 0 }
      ]
    }
  ];
  showErrors: boolean = false;

  constructor(private router: Router, private categoriaEncuestaComponenet: ApiService, private fb: FormBuilder){
    this.questionnaireForm = this.fb.group({
      question1: [null, Validators.required],
      question2: [null, Validators.required],
      question3: [null, Validators.required],
    });

  }

  ngOnInit(): void {
      this.categoriaEncuestaComponenet.selectEncuest$.subscribe(subCategoria => { 
        this.categoria = subCategoria;
      });
      console.log(this.categoria);
  }

  //Metodo del boton Finalizar
  finalizarEncuesta(){
    //this.puntos = 0;
    this.encuestas(this.categoria);// Entrar a la encuesta segun sea seleccionada
   
  }
  
  //Receptaculo Categoria
  actualizarEncuesta(encuestaS: String){
    this.categoria = encuestaS;
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

        this.encuestaResulto(puntajeSi.toString(), 'CAM-ICU','Sin observaciones',(puntajeSi/9)*100);
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
        console.log(this.cons[1], 'AWOL');//Verificar que si hay salida
        this.encuestaResulto(this.puntos.toString(), 'AWOL', this.observacion, (this.puntos/4)/100); //Envia los parametros al metodo
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

        this.encuestaResulto(respuestaNo.toString(), 'Question Pfeiffer', this.observacion, (respuestaNo/10)*100); //Envio de los parametros
        console.log(this.cons[1], 'spmsqp');
        break;
      case 'reloj':
        this.showErrors = true;
        console.log(this.cons[0], this.categoria);
        if(this.questionnaireForm.valid){
          this.puntos = 0; //Reiniciar los puntos
          
          // Iterar sobre las claves del formulario
          for(const key in this.questionnaireForm.controls){
            if(this.questionnaireForm.controls[key].value != null && this.questionnaireForm.controls[key].value != ''){
              this.puntos += this.questionnaireForm.controls[key].value;
            }
          }
          this.showErrors = false;
        }

        if(this.puntos >= 9){
          this.observacion = 'NORMAL';
        } else if(this.puntos == 8){
          this.observacion = 'DEFICIT LIMITE';
        } else if(this.puntos == 6 || this.puntos == 7){
          this.observacion = 'DEFICIT LEVE';
        } else if(this.puntos == 4 || this.puntos == 5){
          this.observacion = 'DEFICIT MODERADO';
        } else {
          this.observacion = 'DEFICIT SEVERO';
        }

        //Control de Envio si esta respondido la encuesta
        if(!this.showErrors){
          console.log('Entrada If del Reloj');
          this.showErrors = true; //Convertirse en verdadero antes de llamar al metod, para enviar al siguiente componente
          this.encuestaResulto(this.puntos.toString(), 'Prueba de Reloj',this.observacion, (this.puntos/10)*100);
        }
        console.log(this.cons[1], 'Prueba Reloj');
        break;
    }

  }

  /* ALGUNOS METODOS POR CADA ENCUESTA A REALIZAR */

   //Envia los parametros al Componente Resultado segun reciba
   encuestaResulto(puntos: string, nameEncuesta: String, observacion: String, porcentaje: FLOAT){
    if(this.showErrors){
     // Al navegar, enviamos los puntos al componente de resultado
     this.router.navigate(['home/resultado'], {queryParams: {
       puntaje: puntos, //Puntaje Obtenido
       nameEncuesta: nameEncuesta, //Nombre de la Encuesta
       porcentaje: porcentaje.toFixed(2),
       observacion: observacion //Observaciones
     }});
   }
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

  // Método para verificar que la respuesta de la pregunta este seleccionado
  hasError(fieldName: string): boolean {
    const control = this.questionnaireForm.get(fieldName);
    return !!control?.invalid && (control?.touched || this.showErrors);
  }

}
