import { Component } from '@angular/core';
import { MedicalHistory } from 'src/app/Shared/Data';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  medicalRecords: MedicalHistory[] = [
    {
      id: 1,
      doctor: 'Dr. John Doe',
      paciente: 'Jane Smith',
      diagnostico: 'Faringitis',
      resultado: 150,
      observaciones: 'Recomienda reposo',
      fechaCaptura: '2023-10-02',
      hora: '14:30',
      centroMedico: 'Clínica Central'
    },
    {
      id: 2,
      doctor: 'Dr. Sarah Johnson',
      paciente: 'Carlos Pérez',
      diagnostico: 'Gripe',
      resultado: 150,
      observaciones: 'Tratamiento completado',
      fechaCaptura: '2023-10-01',
      hora: '10:15',
      centroMedico: 'Hospital Sur'
    },
    // Agrega más registros si es necesario
  ];

  constructor(){
    
  }


  editRecord(record: MedicalHistory) {
    console.log('Edit record:', record);
    // Lógica para editar el registro médico
  }

  deleteRecord(id: number) {
    console.log('Delete record with id:', id);
    this.medicalRecords = this.medicalRecords.filter(record => record.id !== id);
  }

  updateRecord(record: MedicalHistory) {
    console.log('Update record:', record);
    // Lógica para actualizar el registro médico
  }

  public downloadPDF(): void{
    const doc = new jsPDF('p', 'mm', 'a4');

    // Cargar imágenes (logo y otra imagen)
    const logoURL = 'assets/Imagenes/arbol_seco.jpg'; // Cambia esto a la URL o ruta del logo
    const imgTreeURL = 'assets/Imagenes/icono.png'; // Cambia esto a la URL o ruta de la imagen del árbol

    // Agregar logo
    doc.addImage(logoURL, 'PNG', 10, 10, 30, 30); // Posición y tamaño del logo

    // Agregar título
    doc.setFontSize(16);
    doc.text('Centro Geriátrico de Yucatán, México', 70, 20); // Centrar o ajustar según sea necesario

    // Agregar imagen del árbol en la esquina
    doc.addImage(imgTreeURL, 'PNG', 170, 10, 30, 30); // Posición y tamaño de la imagen

    // Información del doctor y paciente
    doc.setFontSize(12);
    doc.text('Dr. Juan Perez', 20, 50);  // Texto del doctor
    doc.text('Paciente: Diana Lopez', 20, 60);  // Texto del paciente

    // Agregar línea divisoria
    doc.line(20, 65, 190, 65); // Dibuja una línea horizontal

    // Agregar tabla de datos médicos
    doc.setFontSize(10);
    doc.text('Diagnóstico', 20, 75);
    doc.text('Puntaje', 60, 75);
    doc.text('Observaciones', 90, 75);
    doc.text('Fecha de Captura', 130, 75);
    doc.text('Hora', 160, 75);
    doc.text('Centro Médico', 180, 75);

    // Insertar filas de la tabla con color de fondo para la cabecera
    doc.setFillColor(255, 192, 203); // Color rosa claro
    doc.rect(15, 70, 180, 10, 'F'); // Fondo para la cabecera

    let y = 85;
    this.medicalRecords.forEach(record => {
      doc.text(record.diagnostico, 20, y);
      doc.text(record.resultado.toString(), 60, y);
      doc.text(record.observaciones, 90, y);
      doc.text(record.fechaCaptura, 130, y);
      doc.text(record.hora, 160, y);
      doc.text(record.centroMedico, 180, y);
      y += 10;
    });

    // Agregar pie de página con la fecha actual
    const date = new Date();
    doc.text(`Fecha de generación: ${date.toLocaleDateString()} ${date.toLocaleTimeString()}`, 20, 290); // Parte inferior de la página
    doc.text('Documento generado en HTML', 180, 290);

    // Descargar el archivo PDF
    doc.save('reporte_medico.pdf');
  }

}
