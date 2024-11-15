import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private urlweb = 'http://127.0.0.1:8000/api/web';  // Cambiar según tus rutas en Laravel

  constructor(private http: HttpClient) {}

  // Método para registrar un paciente en el backend
  registerPatient(patientData: any): Observable<any> {
    return this.http.post(`${this.urlweb}/patients`, patientData);
  }

  // Método para obtener todos los pacientes
  getPatients(): Observable<any> {
    return this.http.get(`${this.urlweb}/patients`);
  }

  // Método para obtener un paciente por su ID
  getPatientById(id: number): Observable<any> {
    return this.http.get(`${this.urlweb}/patients/${id}`);
  }

  // Método para actualizar los datos de un paciente
  updatePatient(id: number, patientData: any): Observable<any> {
    return this.http.put(`${this.urlweb}/patients/${id}`, patientData);
  }

  // Método para eliminar un paciente
  deletePatient(id: number): Observable<any> {
    return this.http.delete(`${this.urlweb}/patients/${id}`);
  }
}
