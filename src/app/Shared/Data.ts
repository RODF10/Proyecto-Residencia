export interface MedicalHistory {
  categoria: string;
  encuesta: string;
  fecha: Date;
  puntos: number;
  observacion: string;
  }

export interface Resultado {
    nombre: string;
    puntaje: number;
    observacion: string;
}

export interface categoria{
  name: String;
}

export interface PreguntaDosOpc{
  texto: String;
  respuesta: String;
}

// OPCIONES Y RESULTADO DE LA ENCUESTA [PRUEBA DE RELOJ] PUNTAJE Y PREGUNTAS
export interface Option{
  label: String;
  score: number;
}
export interface Question{
  text: String;
  options: Option[];
}
//Captura respuesta seleccionada
export interface QuestionSelec{// Opciones con checbox
  text: String;
  option: Option[];
  selectedScore?: number;
}
// OPCOINES BOOLEANAS
export interface Checkbox{// Checkbox
  text: String;
  seleccionada: boolean;
}
export interface QuestionCheck{
  question: String;
  options: Checkbox[];
}

//Categoria y SubCategoria
export interface CategorySelection {
  mainCategory: number;
  subCategory: number;
}

//Agendar Cita
export interface Cita {
  id: number; // Asegúrate de incluir el ID
  registration_number: string;
  nombre_completo: string;
  fecha: string;
  hora: string;
}
// Opciones Boolenas con imagen
export interface ResImage{ // Opciones con imagenes
  titulo: string;
  imagen?: string;
  opciones: CheckPoint[];
  tipoEspecial?: string;
}
interface CheckPoint{ // Check con Puntuacion
  text: string;
  seleccionada: boolean;
  puntuacion: number;
}