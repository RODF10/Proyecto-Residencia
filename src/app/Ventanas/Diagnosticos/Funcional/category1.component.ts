import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ResultadoService } from 'src/app/Service/resultado.service';
import { FormBuilder } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DiagnosticComponent } from '../../diagnostic/diagnostic.component';
import { ApiService } from 'src/app/Service/api.service';
import { Checkbox, Question } from 'src/app/Shared/Data';
import { float, FLOAT } from 'html2canvas/dist/types/css/property-descriptors/float';
import { LoadJSService } from 'src/app/Service/load-js.service';

@Component({
  selector: 'app-category1',
  templateUrl: './category1.component.html',
  styleUrls: ['./category1.component.scss'],
})
export class Category1Component implements OnInit {
  //Datos Basicos para captura
  encuestaSelect: String = '';
  puntos: number = 0;
  observacion: string = '';
  showErrors: boolean = false;
  categoria?: String;
  mensajeError: string = '';
  ent: String [] = ['Entrada de ', 'Salida de ']

  // Propiedades para los valores de peso
  peso1: FLOAT = 0.0; // Year
  peso2: FLOAT = 0.0; // Actual
  pesoYear: string = '';
  pesoActual: string = '';
  // Mensajes de error
  pesoHaceUnAnioError: string = '';
  pesoActualError: string = '';
  //Validacion de Numero
  pesoIn: boolean = false; pesoIn2: boolean = false;

  /* Preguntas y Opciones de BARTHEL */
  preguntasBarthel: Question[] = [
    { text: 'Alimentación',
      options: [
        { label: 'Independiente: Capaz de utilizar cualquier instrumento, come en tiempo, puede ser servida o cocinada por otra persona', score: 10 },
        { label: 'Ayuda: Necesita ayuda pero capaz de comer solo', score: 5 },
        { label: 'Dependiente: Depende de otra persona para comer', score: 0 }
      ]
    },
    { text: 'Bañarse/Ducharse',
      options: [
        { label: 'Independiente: Entra y sale solo del baño, sin supervisión', score: 5 },
        { label: 'Dependiente: Necesita ayudao o supervisión', score: 0 }
      ]
    },
    { text: 'Vestirse',
      options: [
        { label: 'Independiente: Capaz de ponerse y de quitarse la ropa, abotonarse, atarse los zapatos' , score: 10 },
        { label: 'Ayuda: Necesita de personal, pero al menos puede realiza las tareas con tiempo razonable' , score: 5},
        { label: 'Dependiente: Necesita ayuda para algunas actividades', score: 0 }
      ]
    },
    { text: 'Aseo Personal',
      options: [
        { label: 'Independiente: Realiza todas las actividades sin personal' , score: 5 },
        { label: 'Dependiente: Requiere de personal para asearse en algunas actividades', score: 0 }
      ]
    },
    { text: 'Control de Orina',
      options: [
        { label: 'Continente: No presenta inconsistencia, capaz de atender solo su cuidado', score: 10 },
        { label: 'Incontinencia Ocasional: Como máximo incontigencia en 24hrs, requiere ayuda para el cuidado', score: 5 },
        { label: 'Incontinencia: Episodios de incontigencia con frecuencia una vez en 24hrs, incapaz de manejar su cuidado', score: 0 }
      ]
    },
    { text: 'Control de Heces',
      options: [
        { label: 'Continencia Normal: No presenta episodios, capaz de administrase solo', score: 10 },
        { label: 'Ocasional: Ocasionalmente una vez por semana, necesita ayuda por supositorios', score: 5 },
        { label: 'Incontinencia: Más de un episodio por semana', score: 0 }
      ]
    },
    { text: 'Uso del Retrete (TAZA)', 
      options: [ 
        { label: 'Independiente: Usa el retrete por si mismo sin ayuda', score: 10 },
        { label: 'Ayuda: Requiere de personal oara mantener el equilibrio sentado, limpiarse o ponerse de pie', score: 5 },
        { label: 'Dependiente: Requiere totalmente de ayuda personal para ir la baño', score: 0 }
      ]
    }, 
    { text: 'Traslado Sillón-Cama', 
      options: [ 
        { label: 'Independiente: Puede ir del sillón a la cama sin personal supervisor', score: 15 },
        { label: 'Mínima ayuda: Requiere supervisión o pequeña ayuda para traslado', score: 10 },
        { label: 'Gran Ayuda: Requiere de ayuda para traslado, capaz de permanecer sentado sin ayuda', score: 5 },
        { label: 'Dependiente: Requiere de 2 personas o gura para traslado, incapaz de sentrase solo', score: 0 }
      ]
    }, { text: 'Dezplazamiento', 
      options: [ 
        { label: 'Independiente: Puede caminar 50 metros o equivalente sin supervisor' , score: 15 },
        { label: 'Ayuda: Camina 50m, pero necesita personal (física o verbal) o suvervisor', score: 10 },
        { label: 'Independiente en silla de ruedas: Propulsa su silla 50m sin ayuda o supervisión', score: 5 },
        { label: 'Dependiente: No puede caminar solo o propulsar su silla', score: 0 }
      ]
    }, 
    { text: 'Escalones', 
      options: [ 
        { label: 'Independiente: Puede bajar y subir escaleras sin supervición' , score: 10 },
        { label: 'Ayuda: Requiere ayuda física o supervisión para subir o bajar', score: 5 },
        { label: 'Dependiente: Incapaz de subir y bajar escaleras, requiere asesor', score: 0 }
      ], 
    }
  ]
  respuestas: number[] = new Array(this.preguntasBarthel.length).fill(-1); // Array para almacenar respuestas (-1 indica no respondida)
  
  /* Preguntas ENSRUD */
  preguntasEnsrud: Checkbox[] = [
    { text: '1.- Pérdida de peso de 5% o mayor en los últimos 30 días', seleccionada: false },
    { text: '2.- Inhabilitado para levantarse de una silla 5 veces sin emplear los brazos', seleccionada: false },
    { text: '3.- Pobre energía identificado con una respuesta negativa: "¿Siente usted con energía?"', seleccionada: false },
  ];
  // Respuestas de las preguntas Ensrud
  answers: {[key: string]:number | null} = {
      resistance: null,
      aerobic: null,
      illnesses: null,
      fatigue: null
  };
  // Mensaje de error por campo
  fieldErrors: { [key: string]: string } = {};

  /* CRONOMETRO */
  tiempo: number = 0; // Tiempo en milisegundos
  intervalId: any;
  capturas: string[] = []; // Lista para guardar tiempos capturados
  corriendo: boolean = false;
    
  //Encuesta KATZ
  preguntasKATZ: Question[] = [
      { text: 'BAÑO (Esponja, regadera o tina)',
        options: [
          { label: 'No recibe asistencia (puede entrar y salir de la tina u otra forma de baño).', score: 1 },
          { label: 'Que reciba asistencia durante el baño en una sola parte del cuerpo', score: 1 },
          { label: 'Dependiente: Que reciba asistencia durante el baño en más de una parte.', score: 0 }
        ]
      },
      { text: 'VESTIDO',
        options: [
          { label: 'Que pueda tomar las prendas y vestirse completamente, sin asistencia.', score: 1 },
          { label: 'Que pueda tomar las prendas y vestirse sin asistencia excepto en abrocharse los zapatos.', score: 1 },
          { label: 'Que reciba asistencia para tomar las prendas y vestirse.', score: 0 }
        ]
      },
      { text: 'USO DEL SANITARIO',
        options: [
          { label: 'Sin ninguna asistencia (puede utilizar objeto de soporte: bastón o silla de ruedas y/o puede arreglar su ropa o el uso de pañal o cómodo).', score: 1 },
          { label: 'Que reciba asistencia al ir al baño, en limpiarse y que pueda manejar por si mismo/a el pañal o cómodo vaciándolo.', score: 1 },
          { label: 'Que no vaya al baño por si mismo/a.', score: 0 }
        ]
      },
      { text: 'TRANSFERENCIAS',
        options: [
          { label: 'Que se mueva dentro y fuera de la cama y silla sin ninguna asistencia (utiliza un auxiliar de la marcha u objeto de soporte).', score: 1 },
          { label: 'Que pueda moverse dentro y fuera de la cama y silla con asistencia.', score: 1 },
          { label: 'Que no pueda salir de la cama.', score: 0 }
        ]
      },
      { text: 'CONTINENCIA',
        options: [
          { label: 'Control total de esfínteres.', score: 1 },
          { label: 'Que tenga accidentes ocasionales que no afectan su vida social.', score: 1 },
          { label: 'Necesita ayuda para supervición del control de enfínteres, utiliza sonda o es incontinente.', score: 0 }
        ]
      },
      { text: 'ALIMENTACIÓN',
        options: [
          { label: 'Que se alimente por si solo sin asistencia alguna.', score: 1 },
          { label: 'Que se alimente solo y que tenga asistencia sólo para cortar la carne o untar mantequilla. ', score: 1 },
          { label: 'Que reciba asistencia en la alimentación o que se alimente parcial o totalmente por vía enteral o parenteral.', score: 0 }
        ]
      },
  ];
  selectedOptions: number[] = Array(this.preguntasKATZ.length).fill(-1);
  errors: boolean[] = Array(this.preguntasKATZ.length).fill(false); // Array para rastrear errores por pregunta

  //Encuesta Brody
  preguntasLowton: Question[] = [
    {
      text: 'CAPACIDAD PARA USAR TELÉFONO',
      options: [
        { label: 'Lo opera por iniciativa propia, lo marca sin problemas.', score: 1 },
        { label: 'Marca sólo unos cuantos números bien conocidos.', score: 1 },
        { label: 'Contesta el teléfono pero no llama.', score: 1 },
        { label: 'No usa el teléfono.', score: 0 }
      ]
    },
    {
      text: 'COMPRAS',
      options: [
        { label: 'Vigila sus necesidades independientemente.', score: 1 },
        { label: 'Hace independientemente sólo pequeñas compras.', score: 0 },
        { label: 'Necesita compañía para cualquier compra.', score: 0 },
        { label: 'Incapaz de cualquier compra.', score: 0 }
      ]
    },
    {
      text: 'COCINA',
      options: [
        { label: 'Planea, prepara y sirve los alimentos correctamente.', score: 1 },
        { label: 'Prepara los alimentos sólo si se le provee lo necesario.', score: 0 },
        { label: 'Calienta, sirve y prepara pero no lleva una dieta adecuada.', score: 0 },
        { label: 'Necesita que le preparen los alimentos.', score: 0 }
      ]
    },
    {
      text: 'CUIDADO DEL HOGAR',
      options: [
        { label: 'Mantiene la casa solo o con ayuda mínima.', score: 1 },
        { label: 'Efectúa diariamente trabajo ligero eficientemente.', score: 1 },
        { label: 'Efectúa diariamente trabajo ligero sin eficiencia.', score: 1 },
        { label: 'Necesita ayuda en todas las actividades.', score: 0 },
        { label: 'No participa.', score: 0 }
      ]
    },
    {
      text: 'LAVANDERÍA',
      options: [
        { label: 'Se ocupa de su ropa independientemente.', score: 1 },
        { label: 'Lava sólo pequeñas cosas.', score: 1 },
        { label: 'Todos se lo tienen que lavar.', score: 0 }
      ]
    },
    {
      text: 'TRANSPORTE',
      options: [
        { label: 'Se transporta solo/a.', score: 1 },
        { label: 'Se transporta solo/a, únicamente en taxi pero no puede usar otros recursos.', score: 1 },
        { label: 'Viaja en transporte colectivo acompañado.', score: 1 },
        { label: 'Viaja en taxi o auto acompañado.', score: 0 },
        { label: 'No sale.', score: 0 }
      ]
    },
    {
      text: 'MEDICACIÓN',
      options: [
        { label: 'Es capaz de tomarla a su hora y dosis correctas.', score: 1 },
        { label: 'Se hace responsable sólo si le preparan por adelantado.', score: 0 },
        { label: 'Es incapaz de hacerse cargo.', score: 0 }
      ]
    },
    {
      text: 'FINANZAS',
      options: [
        { label: 'Maneja sus asuntos independientemente.', score: 1 },
        { label: 'Sólo puede manejar lo necesario para pequeñas compras.', score: 1 },
        { label: 'Es incapaz de manejar dinero.', score: 0 }
      ]
    }
  ];
  optionL: number[] = Array(this.preguntasLowton.length).fill(-1);
  errorsLowton: boolean[] = Array(this.preguntasLowton.length).fill(false);

  // ENCUESTA SPPB
  respuestasSPPB = {
    balanceA: null,
    balanceB: null,
    tiempoBalance: null,
    primeraMedicion: null,
    segundaMedicion: null,
    tiempoSilla: null
  };
   // Array de imágenes
   imgCap: string[] = [
    'assets/Imagenes/caminata/caminata1.png',
    'assets/Imagenes/caminata/caminata2.png',
    'assets/Imagenes/caminata/caminata3.png',
    'assets/Imagenes/caminata/caminata4.png',
    'assets/Imagenes/caminata/caminata5.png'
  ];
  velOpt: boolean = true;

  // VELOCIDAD MARCHA
  timeCap: string = '00:00.00';
  inBoton: boolean = false;

  //Identificador de Persona Mayor
  itemsRiesgo = [
    { text: '¿Necesitaba regularmente ayuda para alguna de las actividades instrumentales de la vida diaria?(uso de transporte, uso de teléfono, manejo de medicación, manejo de dinero, hacer compras, preparar alimentos, labores del hogar o lavar ropa)', si: 1, no: 0, selected: '' },
    { text: '¿Necesitaba algún auxiliar para deambular (bastón, andadera, muletas)?', si: 2, no: 0, selected: '' },
    { text: '¿Necesitaba ayuda para salir de viaje?', si: 1, no: 0, selected: '' },
    { text: '¿Continuó su educación después de los 14 años de edad?', si: 0, no: 1, selected: '' }
  ];

  /* ------------------------------- CONSTRUC DE LA CLASE --------------------------- */
  constructor(private fb: FormBuilder, private encuestaService: ApiService, private router: Router, private route: ActivatedRoute, private LoadJS: LoadJSService) {  
  }
   /* ------------------------------- ONINIT = INICIALIZADOR --------------------------- */
  ngOnInit(): void {
    this.categoria = this.route.snapshot.paramMap.get('categoria')!;
    this.encuestaService.selectEncuest$.subscribe(cat => {
      this.encuestaSelect = cat;
    });
  }

  // En el componente 'Category1Component'
  finalizarEncuesta() {
    this.encuesta(this.encuestaSelect);
    console.log(this.encuestaSelect);
  }

  cambiarCategoria(categoria: String){
    this.encuestaSelect = categoria.toString();
  }

  encuesta(enc: String){
    switch(enc){
      case 'katz':
        console.log(this.ent[0], this.encuestaSelect);
        //VERIFICAR SI LAS OPCIONES ESTEN SELECCIONADAS
        this.errors = this.selectedOptions.map(score => score == -1);

        let katzT = 0;
        for (let i = 0; i < this.selectedOptions.length; i++) {
          katzT += this.selectedOptions[i];
        }
        if(!this.errors.includes(true)){
          const letter = this.getIndependenceCategory();
          this.puntos = katzT;//Pasa los puntos obtenido al puntos
          this.showErrors = true;
          this.encuestaResultado(this.puntos.toString(), 'Indice de KATZ', 'Letra Asignada: ' + letter,(this.puntos/6)*100)
          console.log(this.ent[1] + 'KATZ');
        }
        break;
      case 'barthel':
        console.log(this.ent[0], this.encuestaSelect);
        // Verifica si todas las preguntas tienen respuesta seleccionada
        for (let i = 0; i < this.respuestas.length; i++) {
          if (this.respuestas[i] == -1) {
            this.mensajeError = 'Debe responder todas las preguntas antes de calcular el puntaje.';
            this.puntos = 0;
            return;
          } else {
            this.showErrors = true
            this.mensajeError = '';} //En caso de que se respondas todos, desbloquea el metodo encuestaResultado
        }
        // Calcula el puntaje total sumando los valores seleccionados
        let total = 0;
        for (let i = 0; i < this.respuestas.length; i++) {
          total += this.respuestas[i];
        }
        this.puntos = total;//Pasa los puntos obtenido al puntos

        if(this.puntos <= 20){
          this.observacion = 'Dependencia Total';
        } else if(this.puntos >= 21 && this.puntos <= 60){
          this.observacion = 'Dependencia grave';
        } else if(this.puntos >= 61 && this.puntos <= 90){
          this.observacion = 'Dependencia Moderada';
        } else if( this.puntos >= 91 && this.puntos <= 99){
          this.observacion = 'Dependencia Escasa';
        } else {
          this.observacion = 'Independiente';
        }

        this.encuestaResultado(this.puntos.toString(), 'Indice de Barthel', this.observacion, (this.puntos/100)*100);
        console.log(this.ent[1] + 'Barthel');
        break;
      case 'lawton':
        console.log(this.ent[0], this.encuestaSelect);
        this.errorsLowton = this.optionL.map(score => score == -1);

        let lowtonT = 0;
        for (let i = 0; i < this.optionL.length; i++) {
          lowtonT += this.optionL[i];
        }
        this.puntos = lowtonT;

        if(this.puntos == 8){
          this.observacion = 'Muy activos: actividades instrumentales completas';
        } else if(this.puntos >= 5 && this.puntos <= 7){
          this.observacion = 'Activos: actividades limitadas';
        } else if(this.puntos <= 0){
          this.observacion = 'Inactivos: no realizan actividades instrumentales'
        } else {
          this.observacion = 'Poco activos: limitación del 50 % o más de esas actividades';
        }

        if(!this.errorsLowton.includes(true)){
          this.showErrors = true;
          this.encuestaResultado(this.puntos.toString(),'Escala Lowton y Brody', this.observacion, (this.puntos/8)*100);
        }
      
        console.log(this.ent[1] + 'Brody y Lowton');
        break;
      case 'frail':
          console.log('Entrada de: FRAIL');
          
          let allAnswered = true;
          // Validar cada pregunta
          for (const question in this.answers) {
            if (this.answers[question] === null) {
              this.fieldErrors[question] = 'Por favor, seleccione una opción.';
              allAnswered = false;
            } else {
              this.fieldErrors[question] = ''; // Limpia errores si hay respuesta
            }
          }

          if(allAnswered){
            this.mensajeError = '';
            //Calculo del Peso
            if(this.pesoIn && this.pesoIn2){
              this.peso1 = parseFloat(this.pesoYear); //Year Anterior
              this.peso2 = parseFloat(this.pesoActual);//Actual
            } else { this.peso1 = 0.0; this.peso2 = 0.0}
            const value = (((this.peso1 - this.peso2)/this.peso1)*100).toFixed(2); //Convertir para validar en if
            if(parseFloat(value) >= 5){
              // Cuando el peso cumple la condicion pasaa ser 1
              this.puntos =+ 1;
            }
            //Calcular Puntaje
            for (const question in this.answers) {
              if (this.answers[question] == 1) {
                this.puntos += 1; // Suma 1 por cada respuesta positiva
              }
            }            
            this.showErrors = true;
            

          } else {
            this.mensajeError = 'Por favor, responda todas las preguntas.';
          }

          if(this.puntos >= 5){
            this.observacion = 'Probable Fragilidad';
          } else if(this.puntos <= 0){
            this.observacion = 'Sin fragilidad o robuztez';
          } else {
            this.observacion = 'Probable pre-fatiga'
          }
          
          this.encuestaResultado(this.puntos.toString(), 'FRAIL', this.observacion, (this.puntos/5)*100);

          console.log("Salida de Frail | ", this.puntos);
          break;
      case 'ensrud':
        console.log('Entrada de: Ensrud');
        this.puntos = this.preguntasEnsrud.filter(p => p.seleccionada).length;
        this.showErrors = true;
        if(this.puntos >= 2){
          this.observacion = 'Estado Fragil';
        } else if(this.puntos == 1){
          this.observacion = 'Estado Prefragil'
        } else {
          this.observacion = 'Estado Ningun criterio (Robusto)';
        }
        console.log('Salida de: Ensrud');
        this.encuestaResultado(this.puntos.toString(), 'Criterio Ensrud', this.observacion, (this.puntos*3)/100);
        break;
      case 'timeup':
        const tiempoEnSegundos = this.convertirATiempoEnSegundos(this.calcularPromedioTemp());

        if (tiempoEnSegundos <= 10) {
          this.observacion = 'Normal';
        } else if (tiempoEnSegundos >= 11 && tiempoEnSegundos <= 13) {
          this.observacion = 'Discapacidad leve de movilidad';
        } else if (tiempoEnSegundos > 13) {
          this.observacion = 'Riesgo elevado de caída';
        }
        this.showErrors = true;
        this.encuestaResultado(this.calcularPromedioTemp(), 'Time Up and Go', this.observacion, tiempoEnSegundos, 'seg');
        break;
      case 'sppb':
        this.puntajeSPPB();

        if(this.puntos >= 0 && this.puntos <= 6){
          this.observacion = 'Bajo Rendimiento';
        } else if(this.puntos >= 7 && this.puntos <= 9){
          this.observacion = 'Intermedio';
        } else {
          this.observacion = 'Alto Rendimiento';
        }
        this.encuestaResultado(this.puntos.toString(),'Short Physical Performance Battery', this.observacion, (this.puntos/12)*100);
        break;
      case 'velmarcha':
        this.showErrors = true;
        const capSeg = this.convertirATiempoEnSegundos(this.timeCap);
        
        let vm: number;
        if (capSeg === 0) {
          vm = 0; // O asigna un valor predeterminado
        } else {
          vm = 4 / capSeg;
        }
        if(vm == 0) {
          this.observacion = 'None'
        } else if(vm < 0.8){
          this.observacion = 'Disminucion de desempeño de los componentes que definen';
        } else if(vm < 1){
          this.observacion = 'Predice riesgo de desenlaces adversos';
        } else {
          this.observacion = 'Ninguna Captura con estos datos'
        }
        this.encuestaResultado(vm.toFixed(2).toString(), 'Velocidad de Marcha', this.observacion, (capSeg/4)*10, 'm/seg')
        console.log(vm.toFixed(2) + 'm/seg - Obs: '+this.observacion);
        break;
      case 'riesgoHpt':
        const allSelected = this.itemsRiesgo.every(item => item.selected !== '');
        this.showErrors = !allSelected;
        console.log(this.showErrors);

        if(this.puntos <= 1){
          this.observacion = 'Riesgo Bajo'
        } else if(this.puntos > 1 && this.puntos <= 3){
          this.observacion = 'Riesgo Intermedio';
        } else {
          this.observacion = 'Riesgo Alto';
        }

        if(allSelected){
          this.showErrors = true;
          this.encuestaResultado(this.puntos.toString(), 'identificar Riesgo Hospitalizacion en Personas Mayores', this.observacion, (this.puntos/5)*100);
        }
        break;
    }
  }

  //Metodo para pasar al siguiente componente, en case de que este respondidos las respuestas
  encuestaResultado(puntos: string, nameEncuesta: String, observacion: String, porcentaje: FLOAT, ent: string = 'pto'): void{
    if(this.showErrors){
      // Al navegar, enviamos los puntos al componente de resultado
      this.router.navigate(['home/resultado'], {queryParams: {
        puntaje: puntos, //Puntaje Obtenido
        nameEncuesta: nameEncuesta, //Nombre de la Encuesta
        porcentaje: porcentaje.toFixed(2),
        observacion: observacion, //Observaciones
        entrada: ent
      }});
      localStorage.removeItem('subCatSeleccionada'); 
   }
  }
  //Seleccionar respuesta de Opcion Multiple (BARTHEL)
  seleccionarRespuesta(index: number, score: number): void {
    this.respuestas[index] = score;
  }
  //Si esta seleccionado el checkbox se suma 1 punto
  toggleCheckbox(index: number, event: any): void {
    this.preguntasEnsrud[index].seleccionada = event.target.checked;
  }
  //Valida la entrada del usuario para que solo acepte números y un punto decimal.
  validateInput(event: Event, field: string): void {
    const input = event.target as HTMLInputElement;
    let value = input.value;
    // Mensaje de error por defecto
    let errorMessage = '';

    // Permitir solo números y un punto decimal
    if (!/^\d*\.?\d*$/.test(value)) {
      errorMessage = 'Solo se permiten números y un punto decimal.';
      value = value.replace(/[^0-9.]/g, ''); // Eliminar caracteres no válidos
    }

    // Permitir solo un punto decimal
    const parts = value.split('.');
    if (parts.length > 2) {
      value = parts[0] + '.' + parts[1]; // Mantener solo el primer punto decimal
    }

    // Limitar a 4 caracteres como máximo
    if (value.length > 4) {
      value = value.slice(0, 4);
    }

    // Actualizar el valor en el modelo y muestra mensage de error
    if (field == 'pesoYear') {
      this.pesoYear = value;
      this.pesoHaceUnAnioError = errorMessage;
      this.pesoIn = true;
    } else if (field == 'pesoActual') {
      this.pesoActual = value;
      this.pesoActualError = errorMessage;
      this.pesoIn2 = true;
    }
  }
  onAnswerChange(question: string, value: number): void {
    this.answers[question] = value;
    this.fieldErrors[question] = ''; // Limpia errores si selecciona respuesta
    this.mensajeError ='';
  }
  //FUNCION CRONOMETRO
  iniciarPausar(): void {
    if (this.corriendo) {
      clearInterval(this.intervalId);
    } else {
      this.intervalId = setInterval(() => {
        this.tiempo += 10; // Incrementa cada 10ms
      }, 10);
    }
    this.corriendo = !this.corriendo;
    this.inBoton = true;
  }

  reiniciar(){
    clearInterval(this.intervalId);
    this.tiempo = 0;
    //this.capturas = [];
    this.corriendo = false;
    this.inBoton = false;
  }
  capturarTiempo(){
    const minutos = Math.floor(this.tiempo / 60000);
    const segundos = Math.floor((this.tiempo % 60000) / 1000);
    const milisegundos = Math.floor((this.tiempo % 1000) / 10);

    this.capturas.push(`${this.pad(minutos)}:${this.pad(segundos)}.${this.pad(milisegundos)}`);
  }
  private pad(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }
  deleteScore(){
    this.capturas = [];
    this.reiniciar();
  }
  // Convierte a milisegundos
  private convertirATiempoEnMilisegundos(captura: string): number {
    const [minutos, segundosMilisegundos] = captura.split(':');
    const [segundos, centisegundos] = segundosMilisegundos.split('.');
    return (
      parseInt(minutos, 10) * 60000 +
      parseInt(segundos, 10) * 1000 +
      parseInt(centisegundos, 10) * 10
    );
  }
  // Método para convertir tiempo `mm:ss.SS` a segundos (number)
  convertirATiempoEnSegundos(captura: string): number {
    const [minutos, segundosMilisegundos] = captura.split(':');
    const [segundos, centisegundos] = segundosMilisegundos.split('.');

    // Convertir minutos a segundos y sumar los segundos y centisegundos
    return (
      parseInt(minutos, 10) * 60 +
      parseInt(segundos, 10) +
      parseInt(centisegundos, 10) / 100
    );
  }
  calcularPromedioTemp(): string{
    if (this.capturas.length == 0) {
      return '00:00.00'; // Si no hay capturas, devolver un valor predeterminado.
    }
  
    // Convertir todas las capturas a milisegundos
    const tiemposEnMilisegundos = this.capturas.map(captura =>
      this.convertirATiempoEnMilisegundos(captura)
    );
  
    // Calcular el promedio
    const suma = tiemposEnMilisegundos.reduce((acumulado, tiempo) => acumulado + tiempo, 0);
    const promedio = suma / tiemposEnMilisegundos.length;
  
    // Convertir el promedio a formato `mm:ss.SS`
    const minutos = Math.floor(promedio / 60000);
    const segundos = Math.floor((promedio % 60000) / 1000);
    const centisegundos = Math.floor((promedio % 1000) / 10);
  
    return `${this.pad(minutos)}:${this.pad(segundos)}.${this.pad(centisegundos)}`;
  }
  //Funcion KATZ
  getIndependenceCategory(): string {
    // Define los niveles de independencia/dependencia para cada pregunta
    const independence = this.selectedOptions.map(score => score == 1);
    const dependenceCount = independence.filter(dep => !dep).length;
  
    if (dependenceCount == 0) {
      return 'A'; // Independencia total
    }
  
    if (dependenceCount == 1) {
      return 'B'; // Independencia en todas menos una
    }
  
    const dependentActivities = {
      baño: !independence[0],
      vestido: !independence[1],
      sanitario: !independence[2],
      transferencias: !independence[3],
      continencia: !independence[4],
      alimentación: !independence[5]
    };
  
    if (dependentActivities.baño && dependenceCount == 2) {
      return 'C';
    }
  
    if (dependentActivities.baño && dependentActivities.vestido && dependenceCount == 3) {
      return 'D';
    }
  
    if (dependentActivities.baño && dependentActivities.vestido && dependentActivities.sanitario && dependenceCount == 4) {
      return 'E';
    }
  
    if (dependentActivities.baño && dependentActivities.vestido && dependentActivities.sanitario && dependentActivities.transferencias && dependenceCount == 5) {
      return 'F';
    }
  
    if (dependenceCount == 6) {
      return 'G'; // Dependencia total
    }
  
    if (dependenceCount == 2) {
      return 'H'; // Dependencia en dos actividades no clasificadas en C, D, E, F
    }
  
    return 'Error'; // Caso no contemplado
  }

  puntajeSPPB() {
    this.mensajeError = '';
    this.puntos = 0;

    // Validaciones
    if (this.respuestasSPPB.balanceA == null || this.respuestasSPPB.balanceB == null || this.respuestasSPPB.tiempoBalance == null || this.respuestasSPPB.primeraMedicion == null || this.respuestasSPPB.segundaMedicion == null || this.respuestasSPPB.tiempoSilla == null) {
        this.mensajeError = 'Por favor, responda todas las preguntas.';
        this.showErrors = false;
      return;
    }

    // Cálculo de puntaje
    this.puntos += parseInt(this.respuestasSPPB.balanceA) || 0;
    this.puntos += parseInt(this.respuestasSPPB.balanceB) || 0;

    if (this.respuestasSPPB.tiempoBalance >= 0 && this.respuestasSPPB.tiempoBalance <= 15) {
      if (this.respuestasSPPB.tiempoBalance >= 3.0 && this.respuestasSPPB.tiempoBalance <= 9) this.puntos += 1;
      else if(this.respuestasSPPB.tiempoBalance >= 10) this.puntos += 2;
      else this.puntos += 0;
    } else {
      this.mensajeError = 'El tiempo en la sección de balance debe ser entre 0 y 15 segundos.';
      return;
    }
    // Asignar valores vacíos o null como 0
    const primeraMedicion = parseFloat(this.respuestasSPPB.primeraMedicion);
    const segundaMedicion = parseFloat(this.respuestasSPPB.segundaMedicion);

    this.showErrors = true;

    const menorMedicion = Math.min(primeraMedicion, segundaMedicion);
    if (menorMedicion > 8.70) this.puntos += 1;
    else if (menorMedicion >= 6.21 && menorMedicion <= 8.70) this.puntos += 2;
    else if (menorMedicion >= 4.82 && menorMedicion <= 6.20) this.puntos += 3;
    else if (menorMedicion > 0 && menorMedicion < 4.82) this.puntos += 4;

    if (this.respuestasSPPB.tiempoSilla > 60) this.puntos += 0;
    else if (this.respuestasSPPB.tiempoSilla >= 16.7) this.puntos += 1;
    else if (this.respuestasSPPB.tiempoSilla >= 13.7) this.puntos += 2;
    else if (this.respuestasSPPB.tiempoSilla >= 11.2) this.puntos += 3;
    else this.puntos += 4;
  }

  /* VELOCIDAD DE MARCHA */
  captureTime(){
    const minutos = Math.floor(this.tiempo / 60000);
    const segundos = Math.floor((this.tiempo % 60000) / 1000);
    const milisegundos = Math.floor((this.tiempo % 1000) / 10);
    this.timeCap = (`${this.pad(minutos)}:${this.pad(segundos)}.${this.pad(milisegundos)}`);
    if(this.inBoton){
      this.iniciarPausar();
      this.inBoton = false;
    }
    console.log(this.timeCap);
  }
  //Identificador Persona Mayor
  selectOption(index: number, option: 'si' | 'no') {
    const item = this.itemsRiesgo[index];
    if (item.selected == option) return; // No action if already selected

    // Update score
    if (item.selected) {
      this.puntos -= item[item.selected as 'si' | 'no'];
    }
    //Next
    item.selected = option;
    this.puntos += item[option];
    this.showErrors = false;
  }
}
