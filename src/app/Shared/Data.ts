export interface MedicalHistory {
    id: number;
    doctor: string;
    paciente: string;
    diagnostico: string;
    resultado: number;
    observaciones: string;
    fechaCaptura: string;
    hora: string;
    centroMedico: string;
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
// OPCOINES BOOLEANAS
export interface Checkbox{
  text: String;
  seleccionada: boolean;
}