import { Component } from '@angular/core';
import { Router } from '@angular/router';

export interface Inciso {
  texto: string;
  puntaje: number;
  imagenUrl?: string; // Nueva propiedad para la URL de la imagen
}

export interface Pregunta {
  texto: string;
  incisos: Inciso[];
  respuestaSeleccionada?: number; // Índice del inciso seleccionado
}

export interface Encuesta {
  titulo: string;
  preguntas: Pregunta[];
  puntajeTotal?: number;
  diagnostico?: string;
  expandida?: boolean; // Estado de expansión
}

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.scss']
})
export class EncuestaComponent {
  // Lista de encuestas
  encuestas: Encuesta[] = [
    {
      titulo: 'Índice de Barthel',
      preguntas: [
        {
          texto: 'Alimentación',
          incisos: [
            { texto: 'Totalmente independiente', puntaje: 10 },
            { texto: 'Necesita ayuda para cortar carne, el pan, etc', puntaje: 5 },
            { texto: 'Dependiente', puntaje: 0 },
          ],
        },
        {
          texto: 'Bañarse',
          incisos: [
            { texto: 'Independiente: entra y sale solo del baño', puntaje: 5 },
            { texto: 'Dependiente', puntaje: 0 },
          ],
        },
        {
          texto: 'Vestirse',
          incisos: [
            { texto: 'Independiente: capaz de ponerse y de quitarse la ropa, abotonarse, atarse los zapatos', puntaje: 10 },
            { texto: 'Necesita ayuda', puntaje: 5 },
            { texto: 'Dependiente', puntaje: 0 },
          ],
        },
        {
          texto: 'Arreglarse',
          incisos: [
            { texto: 'Independiente: se lava la cara, manos, se peina, se afeita.', puntaje: 5 },
            { texto: 'Dependiente', puntaje: 0 },
          ],
        },
        {
          texto: 'Deposiciones',
          incisos: [
            { texto: 'Continencia normal', puntaje: 10 },
            { texto: 'Ocasionalmente algún episodio de incontinencia, o necesita ayuda para administrarse supositorios o lavativas', puntaje: 5 },
            { texto: 'Incontinencia', puntaje: 0 },
          ],
        },
        {
          texto: 'Micción',
          incisos: [
            { texto: 'Continencia normal, o es capaz de cuidarse de la sonda si tiene una puesta', puntaje: 10 },
            { texto: 'Un episodio diario como máximo de incontinencia, o necesita ayuda para cuidar de la sonda', puntaje: 5 },
            { texto: 'Incontinencia', puntaje: 0 },
          ],
        },
        {
          texto: 'Usar el retrete',
          incisos: [
            { texto: 'Independiente para ir al cuarto de aseo, quitarse y ponerse la ropa…', puntaje: 10 },
            { texto: 'Necesita ayuda para ir al retrete, pero se limpia solo', puntaje: 5 },
            { texto: 'Dependiente', puntaje: 0 },
          ],
        },
        {
          texto: 'Traslado sillón-cama',
          incisos: [
            { texto: 'Independiente para ir del sillón a la cama', puntaje: 15 },
            { texto: 'Mínima ayuda física o supervisión para hacerlo', puntaje: 10 },
            { texto: 'Necesita gran ayuda, pero es capaz de mantenerse sentado solo', puntaje: 5 },
            { texto: 'Dependiente', puntaje: 0 },
          ],
        },
        {
          texto: 'Deambulación',
          incisos: [
            { texto: 'Independiente, camina solo 50 metros', puntaje: 15 },
            { texto: 'Necesita ayuda física o supervisión para caminar 50 metros', puntaje: 10 },
            { texto: 'Independiente en silla de ruedas sin ayuda', puntaje: 5 },
            { texto: 'Dependiente', puntaje: 0 },
          ],
        },
        {
          texto: 'Escalones',
          incisos: [
            { texto: 'Independiente para bajar y subir escaleras', puntaje: 10 },
            { texto: 'Necesita ayuda física o supervisión para hacerlo', puntaje: 5 },
            { texto: 'Dependiente', puntaje: 0 },
          ],
        },
        
      ],
      expandida: false
    },

    {
      titulo: 'Índice de Katz',
      preguntas: [
        {
          texto: 'A. Baño',
          incisos: [
            { texto: 'Nunca', puntaje: 0 },
            { texto: '-Independiente. Se baña enteramente solo o necesita ayuda sólo para lavar una zona (como la espalda o una extremidad con minusvalía).', puntaje: 1 },
            { texto: '-Dependiente. Necesita ayuda para lavar más de una zona del cuerpo, ayuda para salir o entrar en la bañera o no se baña solo.', puntaje: 2 },
          ]
        },
        {
          texto: 'B. Vestido',
          incisos: [
            { texto: 'Independiente. Coge la ropa de cajones y armarios, se la pone y puede abrocharse. Se excluye el acto de atarse los zapatos.', puntaje: 0 },
            { texto: 'Dependiente. No se viste por sí mismo o permanece parcialmente desvestido.', puntaje: 1 },
          ]
        },
        {
          texto: 'C. Uso Del Wc',
          incisos: [
            { texto: 'Independiente: Va al W.C. solo, se arregla la ropa y se asea los órganos excretores.', puntaje: 0 },
            { texto: 'Dependiente. Precisa ayuda para ir al W.C', puntaje: 1 },
          ]
        },
        {
          texto: 'D. Movilidad',
          incisos: [
            { texto: 'Independiente. Se levanta y acuesta en la cama por sí mismo y puede sentarse y levantarse de una silla por sí mismo.', puntaje: 0 },
            { texto: 'Dependiente. Necesita ayuda para levantarse y acostarse en la cama y/o silla, no realiza uno o más desplazamientos.', puntaje: 1 },
          ]
        },
        {
          texto: 'E. Continencia',
          incisos: [
            { texto: 'Independiente. Control completo de micción y defecación.', puntaje: 0 },
            { texto: 'Dependiente. Incontinencia parcial o total de la micción o defecación', puntaje: 1 },
          ]
        },
        {
          texto: 'F. Alimentación',
          incisos: [
            { texto: 'Independiente. Lleva el alimento a la boca desde el plato o equivalente. Se excluye cortar la carne.', puntaje: 0 },
            { texto: 'Dependiente. Necesita ayuda para comer, no come en absoluto o requiere alimentación parenteral.', puntaje: 1 },
          ]
        }


      ],
      expandida: false
    },

    {
    titulo: 'Escala Lawton Y Brody',
      preguntas: [
        {
          texto: 'CAPACIDAD PARA USAR EL TELEFONO:',
          incisos: [
            { texto: 'Utiliza el teléfono por iniciativa propia', puntaje: 10 },
            { texto: 'Es capaz de marcar bien algunos números familiares', puntaje: 5 },
            { texto: 'Es capaz de contestar al teléfono, pero no de marcar', puntaje: 0 },
            { texto: 'No utiliza el teléfono', puntaje: 0 },
          ]
        },
        {
          texto: 'HACER COMPRAS:',
          incisos: [
            { texto: 'Realiza todas las compras necesarias independientemente', puntaje: 10 },
            { texto: 'Realiza independientemente pequeñas compras', puntaje: 5 },
            { texto: 'Necesita ir acompañado para cualquier compra', puntaje: 0 },
            { texto: 'Totalmente incapaz de comprar', puntaje: 0 },
          ]
        },
        {
          texto: 'PREPARACION DE LA COMIDA:',
          incisos: [
            { texto: 'Organiza, prepara y sirve las comidas por si solo adecuadamente', puntaje: 10 },
            { texto: 'Prepara adecuadamente las comidas si se le proporcionan los ingredientes', puntaje: 5 },
            { texto: 'Prepara, calienta y sirve las comidas, pero no sigue una dieta adecuada', puntaje: 0 },
            { texto: 'Necesita que le preparen y sirvan las comidas', puntaje: 0 },
          ]
        },
        {
          texto: 'CUIDADO DE LA CASA:',
          incisos: [
            { texto: 'Mantiene la casa solo o con ayuda ocasional ( para trabajos pesados)', puntaje: 10 },
            { texto: 'Realiza tareas ligeras, como lavar los platos o hacer las camas', puntaje: 5 },
            { texto: 'Realiza tareas ligeras, pero no puede mantener un adecuado nivel de limpieza', puntaje: 0 },
            { texto: 'Necesita ayuda en todas las labores de casa', puntaje: 0 },
            { texto: 'No participa en ninguna labor de la casa', puntaje: 0 },
          ]
        },
        {
          texto: 'LAVADO DE LA ROPA:',
          incisos: [
            { texto: 'Lava por si solo toda la ropa', puntaje: 10 },
            { texto: 'Lavo por si solo pequeñas prendas', puntaje: 5 },
            { texto: 'Todo el lavado de ropa debe ser realizado por otro', puntaje: 0 },
          ]
        },
        {
          texto: 'USO DE MEDIOS DE TRANSPORTE:',
          incisos: [
            { texto: 'Viaja solo en transporte público o conduce su propio coche', puntaje: 10 },
            { texto: 'Es capaz de coger un taxi, pero no usa otro medio de transporte', puntaje: 5 },
            { texto: 'Viaja en transporte público cuando va acompañado por otra persona', puntaje: 0 },
            { texto: 'Utiliza el taxi o el automóvil sólo con la ayuda de otros', puntaje: 0 },
            { texto: 'No viaja', puntaje: 0 },
          ]
        },
        {
          texto: 'RESPONSABILIDAD RESPECTO A SU MEDICACIÓN:',
          incisos: [
            { texto: 'Es capaz de tomar su medicación a la dosis y hora adecuada', puntaje: 10 },
            { texto: 'Toma su medicación si la dosis es preparada previamente', puntaje: 5 },
            { texto: 'No es capaz de administrarse su medicación', puntaje: 0 },
          ]
        },
        {
          texto: 'MANEJO DE SUS ASUNTOS ECONÓMICOS:',
          incisos: [
            { texto: 'Se encarga de sus asuntos económicos por si solo', puntaje: 10 },
            { texto: 'Realiza las compras de cada día, pero necesita ayuda en las grandes compras', puntaje: 5 },
            { texto: 'Incapaz de manejar dinero', puntaje: 0 },
          ]
        },
      ],
      expandida: false
    },
    {
    titulo: 'Trastorno Neurocognoscitivo Menor. DSM 5',
      preguntas: [
        {
          texto: 'Criterios diagnósticos Del DSM-5 para trastorno neurocognoscitivo menor.',
          incisos: [
            { texto: 'A. Evidencia de un declive cognitivo moderado comparado con el nivel previo de rendimiento en uno o más de uno de los dominios cognitivos (atención compleja, función ejecutiva, aprendizaje y memoria, lenguaje, habilidad perceptual motora o cognición social) basada en:', puntaje: 10 },
            { texto: '1.- Preocupación del individuo, en un infórmate que le conoce o el clínico, porque ha habido un declive significativo en una función cognitiva', puntaje: 5 },
            { texto: '2.- Declive modesto del rendimiento cognitivo, preferentemente documentado por un test neuropsicológico estandarizado o, en su defecto, por la evaluación clínica cuantitativa.', puntaje: 0 },
            { texto: 'B. Los déficits cognitivos son insuficientes para interferir con la independencia de las actividades cotidianas (p. ej., actividades instrumentales de la vida diaria, tareas complejas como manejo de medicación o de dinero), pudiendo ser preciso esforzarse más, utilizar estrategias compensatorias o hacer una acomodación para mantener la independencia.', puntaje: 0 },
            { texto: 'C. Los déficits cognitivos no ocurren exclusivamente en el contexto de síndrome confusional', puntaje: 0 },
            { texto: 'D. Los déficits cognitivos no son atribuibles de forma primaria a la presencia de otros trastornos mentales (por ej. trastorno depresivo mayor, esquizofrenia.', puntaje: 0 },
            { texto: 'Especificar: Sin alteración del comportamiento o Con alteración del comportamiento.', puntaje: 0 },
          ]
        },
      ],
      expandida: false
    },
    {
      titulo: 'Trastorno Neurocognoscitivo Mayor. DSM 5',
        preguntas: [
          {
            texto: 'Criterios diagnósticos Del DSM-5 para trastorno neurocognoscitivo menor.',
            incisos: [
              { texto: 'A. Evidencia de un declive cognitivo significativo comparado con el nivel previo de rendimiento en uno o más de uno de los dominios cognitivos (atención compleja, función ejecutiva, aprendizaje y memoria, lenguaje, habilidad perceptual motora o cognición social) basada en:', puntaje: 10 },
              { texto: '1.- Preocupación del individuo, en un infórmate que le conoce o el clínico, porque ha habido un declive significativo en una función cognitiva', puntaje: 5 },
              { texto: '2.- Declive sustancial del rendimiento cognitivo, preferentemente documentado por un test neuropsicológico estandarizado o, en su defecto, por la evaluación clínica cuantitativa.', puntaje: 0 },
              { texto: 'B. Los déficits cognitivos interfieren con la independencia de las actividades cotidianas (es decir, por lo menos necesita asistencia con las actividades instrumentadas complejas de la vida diaria, como pagar facturas o cumplir los rendimientos)', puntaje: 0 },
              { texto: 'C. Los déficits cognitivos no ocurren exclusivamente en el contexto de síndrome confusional', puntaje: 0 },
              { texto: 'D. Los déficits cognitivos no son atribuibles de forma primaria a la presencia de otros trastornos mentales (por ej. trastorno depresivo mayor, esquizofrenia).', puntaje: 0 },
              { texto: 'Especificar: Sin alteración del comportamiento o Con alteración del comportamiento.', puntaje: 0 },
              { texto: 'Especificar gravedad actual:', puntaje: 0 },
              { texto: 'Leve: dificultad con las actividades instrumentadas cotidianas', puntaje: 0 },
              { texto: 'Moderado: dificultad con las actividades básicas cotidianas', puntaje: 0 },
              { texto: 'Grave: totalmente dependiente', puntaje: 0 },
            ]
          },
        ],
        expandida: false
      },
      {
        titulo: 'MMSE de Folstein',
          preguntas: [
            {
              texto: 'ORIENTACION TIEMPO / ESPACIO',
              incisos: [
                { texto: '¿Cuál es el año?', puntaje: 1},
                { texto: '¿Cuál es el mes?', puntaje: 2 },
                { texto: '¿Qué día del mes es hoy?', puntaje: 3 },
                { texto: '¿Qué día de la semana es hoy?', puntaje: 4 },
                { texto: '¿Qué hora es aproximadamente?', puntaje: 5 },
                { texto: '¿En dónde estamos ahora?', puntaje: 1 },
                { texto: '¿En qué país estamos?', puntaje: 2 },
                { texto: '¿En qué Estado vivimos?', puntaje: 3 },
                { texto: '¿En qué ciudad estamos?', puntaje: 4 },
                { texto: '¿En qué colonia, delegación o municipio?', puntaje: 5 },
              ]
            },
            {
              texto: 'FIJACIÓN',
              incisos: [
                { texto: '"Le voy a decir 3 palabras, cuando yo los termine quiero que por favor Usted los repita” (Anote un punto cada vez que la palabra sea correcta). Flor Coche Nariz', puntaje: 3 },
              ]
            },
            {
              texto: 'CONCENTRACIÓN Y CÁLCULO',
              incisos: [
                { texto: '"Le voy a pedir que reste de 4 en 4 a partir del 40." (Anote un punto cada vez que la diferencia sea correcta aunque la anterior fuera incorrecta.', puntaje: 5 },
              ]
            },
            {
              texto: 'MEMORIA',
              incisos: [
                { texto: '"¿Recuerda usted las tres palabras que le dije antes? Dígalas" Flor Coche Nariz', puntaje: 3 },
              ]
            },
            {
              texto: 'LENGUAJE Y CONSTRUCCIÓN',
              incisos: [
                { texto: '"¿Qué es esto?” (Mostrar un reloj).', puntaje: 1 },
                { texto: '“¿y esto?” (Mostrar un bolígrafo).', puntaje: 2 },
                { texto: '"Repita la siguiente frase después de mí: - “No voy si tu no llegas temprano".', puntaje: 1 },
                { texto: 'Le voy a dar algunas instrucciones. Por favor sígalas en el orden en que se las voy a decir. 1. "Tome el papel con la mano izquierda”, 2. “dóblelo por la mitad” y 3. “póngalo en el suelo"', puntaje: 3 },
                { texto: '"Lea esto y haga lo que dice:" “Cierre los ojos”', puntaje: 1 },
                { texto: '"Quiero que por favor escriba una Oración con sujeto y predicado', puntaje: 1 },
                { texto: '"Copie este dibujo"', puntaje: 1, imagenUrl: 'C:\Users\Fernando Chan Cauich\Documents\Proyecto-Residencia\src\assets\Imagenes\MMSE de Folstein.png'},
              ]
            },
          ],
          expandida: false
        },


    // Agrega más encuestas según sea necesario
  ];

  constructor(private router: Router) {}

  // Alternar expansión de la encuesta
  toggleEncuesta(encuesta: Encuesta): void {
    encuesta.expandida = !encuesta.expandida;
  }

 // Calcular y asignar puntaje total para cada encuesta
 public calcularPuntajeTotal(encuesta: Encuesta): number {
  return encuesta.preguntas.reduce((total, pregunta) => {
    return total + (pregunta.respuestaSeleccionada !== undefined ? pregunta.incisos[pregunta.respuestaSeleccionada].puntaje : 0);
  }, 0);
}

// Asignar diagnóstico basado en el puntaje
private asignarDiagnostico(puntaje: number): string {
  if (puntaje < 3) return 'Leve';
  if (puntaje < 6) return 'Moderado';
  return 'Grave';
}

// Función para finalizar las encuestas
finalizarEncuesta(): void {
  this.encuestas.forEach(encuesta => {
    const puntajeTotal = this.calcularPuntajeTotal(encuesta); // Calcula el puntaje total de la encuesta
    const diagnostico = this.asignarDiagnostico(puntajeTotal); // Asigna el diagnóstico basado en el puntaje

    encuesta.puntajeTotal = puntajeTotal;
    encuesta.diagnostico = diagnostico;
  });

  // Navega al componente de resultados y pasa el estado de las encuestas
  this.router.navigate(['/resultados'], { state: { encuestas: this.encuestas } });
}
}
