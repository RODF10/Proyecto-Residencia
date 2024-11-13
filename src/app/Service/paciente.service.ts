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
   // Método para obtener un paciente por ID
   getPaciente(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }
   // Método para crear un nuevo paciente
   createPaciente(paciente: any): Observable<any> {
    return this.http.post<any>(this.apiURL, paciente);
  }
  // Método para actualizar un paciente
  updatePaciente(id: number, paciente: any): Observable<any> {
    return this.http.put<any>(`${this.apiURL}/${id}`, paciente);
  }
   // Método para eliminar un paciente
   deletePaciente(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${id}`);
  }
}
