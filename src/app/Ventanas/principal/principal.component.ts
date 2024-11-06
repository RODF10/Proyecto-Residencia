import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MedicalHistory } from 'src/app/Shared/Data';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent {
  

  fecha = new Date();
  constructor(private router: Router){
   
  }

  pacientes(){
    this.router.navigate(["login/list-person"]);
  }

  horaActual: Date = new Date();

  ngOnInit(): void {
    setInterval(() => {
      this.horaActual = new Date();
    }, 1000);
  }

  
}
