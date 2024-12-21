import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger,} from '@angular/animations';
import { PATIENTS_DATA } from '../data/patients-data';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/Service/api.service';
import { UserService } from 'src/app/Service/user.service';
import { CategoryGuard } from 'src/app/guards/category.guard';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class PatientsComponent {
  title = 'Pacientes';
  columnsToDisplay: string[] = [
    'first_name',
    'last_name',
    'age',
    'last_consultation',
  ];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  dataSource = new MatTableDataSource(PATIENTS_DATA); // Usa los datos importados
  expandedElement: any | null = null;

  @ViewChild(MatPaginator, { static: true }) paginator:
    | MatPaginator
    | undefined;

    constructor(private router: Router, private apiService: ApiService, private userService: UserService, private authGuard: CategoryGuard){
     
    }

  ngOnInit() {
    localStorage.removeItem('patient_id');
    // Configura el paginador
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }

    // Obtener pacientes del doctor
    this.getPatients();
    console.log('localStorage: ', localStorage.getItem('patient_id'));
  }

  columnHeaders: { [key: string]: string } = {
    first_name: 'Nombre',
    last_name: 'Apellido',
    age: 'Edad',
    last_consultation: 'Última consulta',
  };

  // Método para redirigir al perfil del paciente
  perfilUser(id: number){
    // Redirige al componente del perfil de paciente pasando el id en la URL
    this.authGuard.setAccessedFromList(true);
    this.router.navigate(['home/view-person',{patientID: id}]);
    console.log(id)
  }

  patient(){
    this.router.navigate(['/home/register-patient'])
  }

  getPatients(){
    this.apiService.getPatientsByDoctor(this.userService.getDoctorId()).subscribe(
      (response) =>{
        this.dataSource.data = response.patients.map((patient: any) => ({
          ...patient,
          age: this.calculateAge(patient.birth_date),
        }));
      }, (error) =>{
        alert('Error al obtener los pacientes');
      }
    );
  }
  calculateAge(birthDate: string | null): string {
    if (!birthDate) {
      return 'N/A';
    }
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDifference = today.getMonth() - birthDateObj.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }
    return age.toString();
  }
}
