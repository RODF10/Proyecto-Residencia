import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private apiURL = 'http://127.0.0.1:8000/api/pacientes';
  constructor(private http: HttpClient) {}

  // Método para obtener la lista de pacientes
  getPacientes(): Observable<any> {
    return this.http.get<any>(this.apiURL);
  }
}
