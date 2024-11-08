import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private urlweb = 'http://127.0.0.1:8000/web';  // Cambiar según tus rutas en Laravel

  constructor(private http: HttpClient) {}

  // Método para registrar un paciente en el backend
  registerPacient(userData: any): Observable<any> {
    return this.http.post(`${this.urlweb}/pacientes`, userData);
  }
}

