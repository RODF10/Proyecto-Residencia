import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { first } from 'rxjs';
import { CategoryGuard } from 'src/app/guards/category.guard';
import { AlertService } from 'src/app/Service/alert.service';
import { ApiService } from 'src/app/Service/api.service';
import { LocalStorageService } from 'src/app/Service/local-storage.service';


@Component({
  selector: 'app-vistas',
  templateUrl: './vistas.component.html',
  styleUrls: ['./vistas.component.scss'],
  providers: [DatePipe]  // Proveer DatePipe en el componente
})
export class VistasComponent implements OnInit, OnDestroy{
  patientData: any;
  cuidadorData: any;
  patientID?: number;
  cuidadorForm!: FormGroup;
  formPerfil!: FormGroup;
  idPacient: string = '';
  cuidador: boolean = false;
  perfil: boolean = false;
  vista: boolean = true;
  fechaN?: string = '';
  id_paciente: boolean = false;
  edad: number | null = null;

  constructor(private router: Router, private route: ActivatedRoute, private apiService: ApiService, private alert: AlertService, private authGuadr: CategoryGuard, private fb: FormBuilder, 
    private datePipe: DatePipe, private storage: LocalStorageService
  ) {
    
  }

  ngOnInit(): void {
    // Obtener el patientId desde los parámetros de la ruta
    this.route.paramMap.subscribe(params => {
      this.patientID = +params.get('patientID')!;
        //Carga los pacientes
        this.cargarPaciente(this.patientID);
    });
    
    // Inicializar el formulario
    this.cuidadorForm = this.fb.group({
      cuidador_name: [''],
      cuidador_lastname: [''],
      cuidador_phone: ['', [Validators.pattern(/^\d+$/), Validators.minLength(10), Validators.maxLength(10)]],
      cuidador_email: ['', [Validators.email]],
      cuidador_address: [''],
    });

    this.formPerfil = this.fb.group({
      registration_number: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      birth_date: ['', Validators.required],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      medical_history: ['', Validators.required],
      allergies: ['', Validators.required],
      description: ['', Validators.required]
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
  // Recibe datos del paciente
  cargarPaciente(paciente: number){
    this.apiService.getPatientById(paciente).subscribe(response => {
      this.patientData = response.patient;
      const fechaP = response.patient.birth_date;

      this.cargarDatosForm(this.patientData);

      this.cargaCuidador(response.patient.registration_number);
      if (fechaP) {
        const formattedDate = this.datePipe.transform(fechaP, 'dd/MMMM/yyyy'); // Cambia el formato a 'yyyy/MMMM/dd'
        this.fechaN = formattedDate?.replace('M', this.getMonthName(new Date(fechaP).getMonth())); // Reemplaza el número del mes con el nombre
      }
      console.log('ID: ',response.patient.registration_number);
      if(localStorage.getItem('patient_id') == null){
        localStorage.setItem('patient_id', response.patient.registration_number);
      }
    });
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
  onSubmitPerfil(){
    if(this.formPerfil.valid){
      const pacienteID = this.patientData.registration_number;
      const id = this.patientData.id;
      const profileData = this.formPerfil.value;
      this.apiService.updatePatient(profileData, pacienteID).subscribe(
        (response) => {
          //Logica imss duplicado
          this.modify();
          this.perfilUser(false);
          this.cargarPaciente(id);
          this.alert.success('Perfil del Paciente actualizado', 'Save Successfully');
          this.id_paciente = false;
        }, (error) =>{
          if(error.status == 409){
            this.id_paciente = true;
            this.alert.warning('Número de IMSS duplicado, por favor cambielo', 'No. IMSS Duplicado');
          } else {
            console.error('Erro al actualizar paciente: ', error);
            this.alert.error('Erro de en la subida del Paciente', 'Error Update');
          }
        }
      );
    } else { 
      console.log(this.formPerfil.valid ,this.formPerfil.value)
      this.alert.warning('Formulario incompleto, favor de llenar los datos', 'Formulario inválido');
      console.log('Formulario inválido');
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
    this.cuidadorForm.reset();
  }
  perfilUser(ent: boolean){
    this.perfil = !this.perfil;
    if(ent){
      this.formPerfil.reset();
      this.id_paciente = false;
      this.cargarDatosForm(this.patientData);
      console.log('Cambio');
    }
  }
  getMonthName(monthIndex: number): string {
    const months = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    return months[monthIndex];
  }
  cargarDatosForm(paciente: any){
    this.formPerfil.patchValue({
      registration_number: paciente.registration_number,
      first_name: paciente.first_name,
      last_name: paciente.last_name,
      birth_date: paciente.birth_date,
      gender: paciente.gender,
      address: paciente.address,
      medical_history: paciente.medical_history,
      allergies: paciente.allergies,
      description: paciente.description
    });
    this.edad = this.getEdad(paciente.birth_date);

    this.formPerfil.updateValueAndValidity();
  }
  getEdad(birthDate: string): number {
    const birth = new Date(birthDate); // Convierte la fecha de nacimiento a un objeto Date
    const today = new Date(); // Obtén la fecha actual

    let edad = today.getFullYear() - birth.getFullYear(); // Diferencia de años
    const mes = today.getMonth() - birth.getMonth(); // Diferencia de meses

    // Ajusta si el mes actual es menor al mes de nacimiento, o si están en el mismo mes pero el día actual es menor
    if (mes < 0 || (mes == 0 && today.getDate() < birth.getDate())) {
      edad--;
    }

    return edad;
  }
  
}
