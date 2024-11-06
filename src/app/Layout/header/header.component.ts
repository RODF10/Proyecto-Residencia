import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadJSService } from 'src/app/Service/load-js.service';
import { NavbarService } from 'src/app/Service/navbar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  dropdownOpen = false;

  constructor(private LoadJS: LoadJSService, private router: Router, public varService: NavbarService){
    LoadJS.Carga(["Profile"]);
  }

  mainPage(){
    this.router.navigate(['login/dashboard']);
  }

  ngOnInit() {
    /*this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/login') {
          this.varService.hide();
        } else {
          this.varService.show();
        }
      }
    });*/
  }

}
