import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validator, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { float, FLOAT } from 'html2canvas/dist/types/css/property-descriptors/float';
import { ApiService } from 'src/app/Service/api.service';
import { SharedService } from 'src/app/Service/shared.service';
import { Option, PreguntaDosOpc, Question, QuestionCheck, QuestionSelec, ResImage } from 'src/app/Shared/Data';

@Component({
  selector: 'app-encuesta-cog',
  templateUrl: './encuesta-cog.component.html',
  styleUrls: ['./encuesta-cog.component.scss']
})
export class EncuestaCogComponent implements OnInit{
  /* DATOS BAISCO DE CAPTURA */
  puntos: number = 0; //Puntaje
  showErrors: boolean = false;
  nameEncuesta?: String;
  observacion: String ='';
  categoria: String = 'Undefinid';//Recibir nombre clave
  cons: String[] = ['Entrastes en: ', 'Salida de: '];
  mensajeError?: string;

  isSelected: { [key: string]: boolean } = {};// Validacion de color de AWOL false/true

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

  // MINI COG PREGUNTAS
  minicog: QuestionCheck[] = [
    {question: '1.- Dibujo del Reloj',
      options: [
        { text: 'Normal', seleccionada: false },
      ]},
    {question: '2.- Evocación de las Tres Palabras',
      options: [
        { text: 'Papel', seleccionada: false },
        { text: 'Bicicleta', seleccionada: false },
        { text: 'Cuchara', seleccionada: false }
      ]}
  ];
  //MoCA
  MoCA: ResImage[] = [
    { titulo: 'De acuerdo a la imagen que se muestra, responda de acuerdo al paciente haya hecho correctamente',
      imagen: 'assets/Imagenes/cognitiva/1.jpg',
      opciones: [
        { text: 'Siguió la línea de la primera imagen en orden correcto', seleccionada: false, puntuacion: 1 },
        { text: 'Copió el cuadro de la segunda imagen', seleccionada: false, puntuacion: 1 }
      ] },
    { titulo: 'Dibuja el Reloj: Responda si el paciente pudo realizar el reloj correctamente',
      imagen: 'assets/Imagenes/cognitiva/2.jpg',
      opciones: [
        { text: 'Contorno', seleccionada: false, puntuacion: 1 },
        { text: 'Números', seleccionada: false, puntuacion: 1 },
        { text: 'Agujas', seleccionada: false, puntuacion: 1 }
      ] },
    { titulo: 'Identificación de Animales, seleccione cuales animales respondio correctamente',
      imagen: 'assets/Imagenes/cognitiva/3.jpg',
      opciones: [
        { text: 'León', seleccionada: false, puntuacion: 1 },
        { text: 'Rinoceronte', seleccionada: false, puntuacion: 1 },
        { text: 'Camello', seleccionada: false, puntuacion: 1 }
      ] },
    { titulo: 'Lea los números de acuerdo a lo siguiente:',
      opciones: [
        { text: 'Orden normal [2, 1, 8, 5, 4]', seleccionada: false, puntuacion: 1 },
        { text: 'Orden Inverso [7, 4, 2]', seleccionada: false, puntuacion: 1 }
      ] },
    { titulo: 'Serie de palabras: Debe dar un golpe por la cada palabra "A" mencionada',
      opciones: [
        { text: 'F B A C M N A A J K L B A F A K D A A A J A M O F A A B', seleccionada: false, puntuacion: 1 }
      ] },
    { titulo: 'Repita las siguinetes oraciones:',
      opciones: [
        { text: 'Solo sé que le toca a Juan ayudar hoy', seleccionada: false, puntuacion: 1 },
        { text: 'El gato simpre se esconde debajo del sofá cuando hay perros en la habitación', seleccionada: false, puntuacion: 1 }
      ] },
    { titulo: 'Semejanza entre p. ej. plátano-naranja = fruta',
      opciones: [
        { text: 'tren-bicicleta', seleccionada: false, puntuacion: 1 },
        { text: 'reloj-regla', seleccionada: false, puntuacion: 1}
      ] },
    { titulo: 'Recuerdo Diferido: Puntuación escala de memoria (MIS)',
      imagen: 'assets/Imagenes/cognitiva/4.png',
      opciones: [
        { text: 'Rostro', seleccionada: false, puntuacion: 1 },
        { text: 'Seda', seleccionada: false, puntuacion: 1 },
        { text: 'Templo', seleccionada: false, puntuacion: 1 },
        { text: 'Clave', seleccionada: false, puntuacion: 1 },
        { text: 'Rojo', seleccionada: false, puntuacion: 1 }
      ] },
    { titulo: 'Orientación, responda de acuerdo a la orientación del paciente',
      opciones: [
        { text: 'Fecha', seleccionada: false, puntuacion: 1 },
        { text: 'Mes', seleccionada: false, puntuacion: 1 },
        { text: 'Año', seleccionada: false, puntuacion: 1 },
        { text: 'Día de la Semana', seleccionada: false, puntuacion: 1 },
        { text: 'Lugar', seleccionada: false, puntuacion: 1 },
        { text: 'Localidad', seleccionada: false, puntuacion: 1 }
      ] },
  ];
  restaSeleccionada = {
    93: false,
    86: false,
    79: false,
    72: false,
    65: false
  };
  //Preguntas IQCODE-SF
  optionsSF: Option[] = [
    { label: 'Ha mejorado mucho', score: 1 },
    { label: 'Ha mejorado un poco', score: 2 },
    { label: 'Casi sin cambios', score: 3 },
    { label: 'Ha empeorado un poco', score: 4 },
    { label: 'Ha empeorado mucho', score: 5 }
  ];
  questionSF: QuestionSelec[] = [
    { text: '1.- Para recordar los nombres de personas más íntimas (parientes, amigos).', option: this.optionsSF },
    { text: '2.- Recordar cosas que han sucedido recientemente, durante los 2 ó 3 últimos meses (noticias, cosas suyas o de sus familiares).', option: this.optionsSF },
    { text: '3.- Recordar de qué se habló en una conversación de unos días antes.', option: this.optionsSF },
    { text: '4.- Olvidar qué ha dicho unos minutos antes, pararse en mitad de una frase y no saber que iba a decir, repetir lo que ha dicho un rato antes.', option: this.optionsSF },
    { text: '5.- Recordar la fecha en que vive.', option: this.optionsSF },
    { text: '6.- Conocer el lugar exacto de los armarios de su casa y dónde se guardan las cosas.', option: this.optionsSF },
    { text: '7.- Saber dónde va una cosa que se ha encontrado descolocado.', option: this.optionsSF },
    { text: '8.- Aprender a utilizar un aparato nuevo (lavadora, tocadiscos, radio, ...)', option: this.optionsSF },
    { text: '9.- Recordar las cosas que han sucedido recientemente.', option: this.optionsSF },
    { text: '10.- Aprender cosas nuevas (en general).', option: this.optionsSF },
    { text: '11.- Comprender el significado de palabras poco usuales (del periódico, TV, conversación).', option: this.optionsSF },
    { text: '12.- Entender artículos de los periódicos o revistas en las que está interesado.', option: this.optionsSF },
    { text: '13.- Seguir una historia en un libro, la prensa, el cine, la radio o la TV.', option: this.optionsSF },
    { text: '14.- Tomar decisiones tanto en cuestiones cotidianas (qué ropa ponerse, qué comida preparar) como en asuntos de más trascendencia (dónde ir de vacaciones o invertir el dinero)', option: this.optionsSF },
    { text: '15.- Control de los asuntos financieros (cobrar la pensión, pagar los impuestos, trato con el banco).', option: this.optionsSF },
    { text: '16.- Control de otros problemas de cálculo cotidianos (tiempo entre visitas de familiares, distancias entre lugares y cuánta comida comprar y preparar especialmente si hay invitados)', option: this.optionsSF },
    { text: '17.- ¿Cree que su inteligencia (en general) ha cambiado durante los últimos 10 años?', option: this.optionsSF },
  ];
  selectedAnswersSF: number[] = new Array(this.questionSF.length).fill(-1);

  constructor(private router: Router, private categoriaEncuestaComponenet: ApiService, private fb: FormBuilder, private sharedService: SharedService){
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
    this.encuestas(this.categoria);// Entrar a la encuesta segun sea seleccionada
  }  
  //Receptaculo Categoria
  actualizarEncuesta(encuestaS: String){
    this.categoria = encuestaS;
  }

  /* METODOS DE LAS ENCUESTAS PARA CALCULAR LOS PUNTOS OBTENIDO */
  encuestas(enc: String){
    switch(enc){
      case 'moca':
        console.log(this.cons[0], this.categoria);
        const puntajeEncuesta = this.calcularPuntos();
        const puntajeRestar = this.calcularPuntajeRestar();
        
        // Sumar ambos puntajes
        this.puntos = puntajeEncuesta + puntajeRestar;
        console.log(this.puntos);

        if(this.puntos >= 26){
          this.observacion = 'Se considera normal';
        } else {
          this.observacion = 'Probable transtorno cognitivo';
        }
        this.showErrors = true;
        this.encuestaResulto(this.puntos.toString(), 'Montreal Cognitive Assessment', this.observacion,(this.puntos/30)*100);
        console.log(this.cons[1], 'MoCA');
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
      case 'minicog':
        this.puntos = 0;
    
        this.minicog.forEach(pregunta => {
          pregunta.options.forEach(opcion => {
            if (opcion.seleccionada) {
              if (opcion.text === 'Normal') {
                this.puntos += 2;  // "Normal" suma 2 puntos
              } else {
                this.puntos += 1;  // Las demás opciones suman 1 punto
              }
            }
          });
        });

        if(this.puntos <= 2){
          this.observacion = 'Probable deterioro cognitivo, recomienda evaluación cognitiva amplia';
        } else {
          this.observacion = 'Muy poco probable que haya deterioro cognitivo';
        }
        this.showErrors = true;
        this.encuestaResulto(this.puntos.toString(), 'Mini-Cog', this.observacion, (this.puntos/5)*100,);
        console.log(this.puntos);
        break;
      case 'codesf':
        let total = 0;
        this.showErrors = false;

        for (let i = 0; i < this.selectedAnswersSF.length; i++) {
          const score = this.selectedAnswersSF[i];
          if (score == -1) {
            this.showErrors = true;
            return;
          }
          // Sumar el puntaje si la respuesta es válida
          total += score;
        }
        this.nextComponent(total);
        break;
    }

  }

  /* ALGUNOS METODOS POR CADA ENCUESTA A REALIZAR */

   //Envia los parametros al Componente Resultado segun reciba
   encuestaResulto(puntos: string, nameEncuesta: String, observacion: String, porcentaje: FLOAT){
    // Captura de los datos en una constante tipo any
    const resultados = {
      point: puntos,
      encuesta: nameEncuesta,
      observable: observacion,
      porcent: porcentaje.toFixed(2)
    }
    if(this.showErrors){
      //Captura los datos de la cosntante y envia al servicio para su captura
      this.sharedService.saveResults(resultados);
      // Navegar al componente de resultados
      this.router.navigate(['home/resultado']);
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

  calcularPuntos(): number {
    let totalPuntos = 0;
  
    this.MoCA.forEach(encuesta => {
      encuesta.opciones.forEach(opcion => {
        if (opcion.seleccionada) {
          totalPuntos += opcion.puntuacion;
        }
      });
    });
  
    return totalPuntos;
  }
  calcularPuntajeRestar(): number {
    let respuestasCorrectas = 0;

    // Verificar cuántas respuestas correctas se seleccionaron
    if (this.restaSeleccionada[93]) respuestasCorrectas++;
    if (this.restaSeleccionada[86]) respuestasCorrectas++;
    if (this.restaSeleccionada[79]) respuestasCorrectas++;
    if (this.restaSeleccionada[72]) respuestasCorrectas++;
    if (this.restaSeleccionada[65]) respuestasCorrectas++;

    // Calcular el puntaje según las respuestas correctas seleccionadas
    if (respuestasCorrectas >= 4) {
      return 3;
    } else if (respuestasCorrectas >= 2) {
      return 2;
    } else if (respuestasCorrectas === 1) {
      return 1;
    } else {
      return 0;
    }
  }
  //Preguntas iqcode-sf
   // Establecer la respuesta de una pregunta
   setAnswer(index: number, score: number): void {
    this.selectedAnswersSF[index] = score;
  }
  nextComponent(points: number){
    if(points >= 57){
      this.observacion = 'Probable deterioro cognitivo';
    } else {
      this.observacion = 'Paciente normal, sin deterioro cognitivo';
    }
    console.log(points + ' / ' + this.observacion)
    const resultado = {
      point: points,
      encuesta: 'IQCODE-SF',
      observable: this.observacion,
      porcent: ((points/85) * 100).toFixed(2)
    }
    this.sharedService.saveResults(resultado);
    this.router.navigate(['home/resultado']);
  }
}
