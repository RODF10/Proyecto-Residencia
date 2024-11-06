import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { LoadJSService } from 'src/app/Service/load-js.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  dropdownOpen = false;

  constructor(private LoadJS: LoadJSService, private router: Router){
    LoadJS.Carga(["Profile"]);
  }

  mainPage(){
    this.router.navigate(['login/dashboard']);
  }

}
