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

@Component({
  selector: 'app-category1',
  templateUrl: './category1.component.html',
  styleUrls: ['./category1.component.scss'],
})
export class Category1Component implements OnInit {
  encuestaSelect: String = '';
  puntos: number = 0;
  observacion: string = '';
  showErrors: boolean = false;
  categoria?: String;
  mensajeError: string = '';

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

  //Preguntas y Opciones de Barthel
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
  //Preguntas Ensrud
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

  constructor(private fb: FormBuilder, private encuestaService: ApiService, private router: Router, private route: ActivatedRoute, private render: Renderer2) {
    
  }

  ngOnInit(): void {
    this.categoria = this.route.snapshot.paramMap.get('categoria')!;
    this.encuestaService.selectEncuest$.subscribe(cat => {
      this.encuestaSelect = cat;
      
      //this.mostrarEncuesta(cat);
    });
  }

  // En el componente 'Category1Component'
  finalizarEncuesta() {
    this.puntos = 0;
    this.encuesta(this.encuestaSelect);
  }

  cambiarCategoria(categoria: String){
    this.encuestaSelect = categoria.toString();
  }

  encuesta(enc: String){
    switch(enc){
      case 'katz':
        break;
      case 'barthel':
        console.log('Entrada de: ', this.categoria);
        // Verifica si todas las preguntas tienen respuesta seleccionada
        for (let i = 0; i < this.respuestas.length; i++) {
          if (this.respuestas[i] == -1) {
            this.mensajeError = 'Debe responder todas las preguntas antes de calcular el puntaje.';
            this.puntos = 0;
            return;
          } else { this.showErrors = true} //En caso de que se respondas todos, desbloquea el metodo encuestaResultado
        }
        // Calcula el puntaje total sumando los valores seleccionados
        let total = 0;
        for (let i = 0; i < this.respuestas.length; i++) {
          total += this.respuestas[i];
        }
        this.puntos = total;//Pasa los puntos obtenido al puntos
        this.mensajeError = '';

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

        this.encuestaResultado(this.puntos, 'Indice de Barthel', this.observacion, (this.puntos/100)*100);
        console.log('Salida de: Barthel', this.puntos);
        break;
      case 'lawton':
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
          
          this.encuestaResultado(this.puntos, 'FRAIL', this.observacion, (this.puntos/5)*100);

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
        this.encuestaResultado(this.puntos, 'Criterio Ensrud', this.observacion, (this.puntos*3)/100);
        break;
    }
  }

  //Metodo para pasar al siguiente componente, en case de que este respondidos las respuestas
  encuestaResultado(puntos: number, nameEncuesta: String, observacion: String, porcentaje: FLOAT){
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
}
