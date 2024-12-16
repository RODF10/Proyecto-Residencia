import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CategorySelection } from '../Shared/Data';

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

  /* COMUNICACION DE VIEW IMAGE EN RESULTADO */
  private numberSource = new BehaviorSubject<CategorySelection>(this.getStoredCategory());
  currentNumber = this.numberSource.asObservable();

  changeCategory(mainCategory: number, subCategory: number) {
    const selection: CategorySelection = { mainCategory, subCategory };
    localStorage.setItem('categorySelection', JSON.stringify(selection)); // Guarda en localStorage
    this.numberSource.next(selection); // Actualiza el observable
  }
  private getStoredCategory(): CategorySelection {
    const stored = localStorage.getItem('categorySelection');
    if (stored) {
      return JSON.parse(stored);
    }
    return { mainCategory: 0, subCategory: 0 }; // Valores por defecto
  }

}
