import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  public isAuthenticated : boolean = false;

  constructor() {}

  login() {
    this.isAuthenticated  = true;
  }

  logout() {
    this.isAuthenticated  = false;
  }

  isLoggedOut(){
    return this.isAuthenticated;
  }
}
