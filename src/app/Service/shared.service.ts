import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private showRegisterButtonSubject = new BehaviorSubject<boolean>(false);

  constructor(){}

  // Observable para que otros componentes se suscriban
  showRegisterButton$ = this.showRegisterButtonSubject.asObservable();

  // Método para actualizar el estado del botón
  setShowRegisterButton(show: boolean): void {
    this.showRegisterButtonSubject.next(show);
  }
}
