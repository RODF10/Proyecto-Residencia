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