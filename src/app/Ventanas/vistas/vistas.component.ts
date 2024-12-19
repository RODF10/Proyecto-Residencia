import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AlertService } from 'src/app/Service/alert.service';
import { ApiService } from 'src/app/Service/api.service';


@Component({
  selector: 'app-vistas',
  templateUrl: './vistas.component.html',
  styleUrls: ['./vistas.component.scss']
})
export class VistasComponent implements OnInit {
  patientData: any;
  patientID?: number;

  constructor(private router: Router, private route: ActivatedRoute, private patientService: ApiService, private alert: AlertService) {
    
  }

  ngOnInit(): void {
    // Obtener el patientId desde los parámetros de la ruta
    this.route.paramMap.subscribe(params => {
      this.patientID = +params.get('patientID')!;

      // Llamar a la API para obtener los detalles del paciente
      this.patientService.getPatientById(this.patientID).subscribe(response => {
        this.patientData = response.patient;
        console.log('ID: ',response.patient.registration_number);
        localStorage.setItem('patient_id', response.patient.registration_number);
      });
    });
  }
  categoria() {
    this.router.navigate(['home/diagnostic']);
  }
  history(){
    this.router.navigate(['home/dashboard'])
  }
  deletePatient(){
    this.route.paramMap.subscribe(params => {
      this.patientID = +params.get('patientID')!;

      this.alert
      .confirm('¿Estás seguro de que deseas eliminar este paciente?', 'Confirmación de eliminación')
      .then((isConfirmed) => {
        if (isConfirmed) {
          // Si el usuario confirma, se realiza la eliminación
          this.patientService.deletePatient(this.patientID!).subscribe(
            (response) => {
              this.router.navigate(['home/list-person']);
              this.alert.success('Paciente eliminado correctamente', 'Éxito');
            },
            (error) => {
              this.alert.error('Ocurrió un error al eliminar el paciente', 'Error');
              console.error('Error al eliminar paciente:', error);
            }
          );
        }
      });
    });
  }
}
