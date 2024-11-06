import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  public visible: boolean = false;

  constructor() {}

  show() {
    this.visible = true;
  }

  hide() {
    this.visible = false;
  }
}
