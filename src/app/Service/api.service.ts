import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private urlApi = 'http://127.0.0.1:8000/web';
  private selectSubCat = new BehaviorSubject<String>('Undefinid');
  selectEncuest$ = this.selectSubCat.asObservable();

  constructor(private http: HttpClient) { }

  registerPacient(userData: any):Observable<any> {
    return this.http.post(`${this.urlApi}/pacientes`, userData);
  }

  seleccionarEncuesta(encuesta: String){
    this.selectSubCat.next(encuesta);
  }
}
