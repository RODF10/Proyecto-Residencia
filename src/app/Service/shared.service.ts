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
  // Método adicional para obtener la categoría almacenada
  public fetchStoredCategory(): CategorySelection {
    return this.getStoredCategory();
  }

  /* 
   *  MANEJO DEL RESULTADO ENTRE COMPONENTES, MATIENE LIMPIA EL URL
   *  Método para guardar los resultados en el servicio
  */ 
  private resultsSource = new BehaviorSubject<any>(null); // Observable para los resultados

  saveResults(results: any): void {
    this.resultsSource.next(results); // Almacena los resultados en el BehaviorSubject
    localStorage.setItem('encuestaResults', JSON.stringify(results)); // Guarda los resultados en localStorage
  }

  // Método para obtener los resultados almacenados
  getStoredResults(): any {
    // Intenta recuperar los resultados del BehaviorSubject o de localStorage
    const storedResults = this.resultsSource.getValue() || JSON.parse(localStorage.getItem('encuestaResults') || 'null');
    return storedResults;
  }
  clearResults(): void {
    localStorage.removeItem('encuestaResults');
    this.resultsSource.next(null);
  }

}
