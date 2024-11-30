import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger,} from '@angular/animations';
import { PATIENTS_DATA } from '../data/patients-data';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    'name',
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

    constructor(private router: Router, ){
     
    }

  ngOnInit() {
    // Configura el paginador
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  columnHeaders: { [key: string]: string } = {
    name: 'Nombre',
    last_name: 'Apellido',
    age: 'Edad',
    last_consultation: 'Última consulta',
  };

  perfilUser(id: number){
    this.router.navigate(['home/view-person']);
  }

  patient(){
    this.router.navigate(['/home/register-patient'])
  }
}
