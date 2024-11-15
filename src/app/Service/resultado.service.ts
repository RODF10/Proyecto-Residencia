import { Injectable } from '@angular/core';
import { Resultado } from '../Shared/Data';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultadoService {
  private resultado = new BehaviorSubject<Resultado | null>(null);
  resultado$ = this.resultado.asObservable();

  constructor() {
    
   }

   setResultado(resultado: Resultado){
    this.resultado.next(resultado);
   }
}
