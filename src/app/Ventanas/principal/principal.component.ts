import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent {

  constructor(private router: Router){

  }

  pacientes(){
    this.router.navigate(["/view-person"]);
  }
  test(){
    this.router.navigate(["/test-list"])
  }
}
