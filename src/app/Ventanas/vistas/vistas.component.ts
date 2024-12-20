import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CategoryGuard } from 'src/app/guards/category.guard';
import { AlertService } from 'src/app/Service/alert.service';
import { ApiService } from 'src/app/Service/api.service';


@Component({
  selector: 'app-vistas',
  templateUrl: './vistas.component.html',
  styleUrls: ['./vistas.component.scss']
})
export class VistasComponent implements OnInit, OnDestroy{
  patientData: any;
  cuidadorData: any;
  patientID?: number;
  cuidadorForm!: FormGroup;
  idPacient: string = '';
  cuidador: boolean = false;
  perfil: boolean = false;
  vista: boolean = true;

  constructor(private router: Router, private route: ActivatedRoute, private apiService: ApiService, private alert: AlertService, private authGuadr: CategoryGuard, private fb: FormBuilder) {
    
  }

  ngOnInit(): void {
    // Obtener el patientId desde los parámetros de la ruta
    this.route.paramMap.subscribe(params => {
      this.patientID = +params.get('patientID')!;

    // Recibe datos del paciente
    this.apiService.getPatientById(this.patientID).subscribe(response => {
        this.patientData = response.patient;
        this.cargaCuidador(response.patient.registration_number);
        console.log('ID: ',response.patient.registration_number);
        //localStorage.setItem('patient_id', response.patient.registration_number);
      });
    });
    
    // Inicializar el formulario
    this.cuidadorForm = this.fb.group({
      cuidador_name: [''],
      cuidador_lastname: [''],
      cuidador_phone: ['', [Validators.pattern(/^\d+$/), Validators.minLength(10), Validators.maxLength(10)]],
      cuidador_email: ['', [Validators.email]],
      cuidador_address: [''],
    });
  }
  ngOnDestroy(): void {
      this.permision();
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
          this.apiService.deletePatient(this.patientID!).subscribe(
            (response) => {
              this.permision();
              this.alert.success('Paciente eliminado correctamente', 'Éxito');
              window.location.reload();
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
  submitFormCuidador(): void {
    const idPciente = this.patientData.registration_number;
    console.log('ID: ', idPciente);
    if (this.cuidadorForm.valid) {
      const formData = { ...this.cuidadorForm.value, patient_id: idPciente };

      // Enviar los datos al servicio
      this.apiService.createCuidador(formData, idPciente).subscribe({
        next: (response) => {
          this.cuidadorForm.reset();
          this.cargaCuidador(idPciente);
          this.modify();
          this.perfilCuidador();
          this.alert.success('Cuidador se guardo exitosamente', 'Envio Success');
        },
        error: (error) => {
          this.alert.error('Error al guarda el cuidador', 'Error Conection');
          console.error('Error al registrar el cuidador:', error);
        },
      });    
    }
  }
  cargaCuidador(cuidador: string){
    // Recibe datos del Cuidador
    this.apiService.getCuidador(cuidador).subscribe(
      (response) => {
        this.cuidadorData = response.cuidador;
      }, (error) => {
        this.alert.error('Erro de conexion con servidor', 'Error Conected');
        console.log('Error al obtener los datos del cuidador:', error);
        this.cuidadorData = { message: 'No se encontraron datos del cuidador'};
      }
    );
  }
  permision(){
    this.authGuadr.setAccessedFromList(false); 
  }
  modify(){
    this.vista = !this.vista;
  }
  perfilCuidador(){
    this.cuidador = !this.cuidador;
  }
  perfilUser(){
    this.perfil = !this.perfil;
  }
}
