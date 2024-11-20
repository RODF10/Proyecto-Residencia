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

  constructor(private http: HttpClient) {}

  /*// Método para registrar un paciente en el backend
  registerPatient(patientData: any): Observable<any> {
    return this.http.post(`${this.}/patients`, patientData);
  }

  // Método para obtener todos los pacientes
  getPatients(): Observable<any> {
    return this.http.get(`${this.}/patients`);
  }

  // Método para obtener un paciente por su ID
  getPatientById(id: number): Observable<any> {
    return this.http.get(`${this.}/patients/${id}`);
  }

  // Método para actualizar los datos de un paciente
  updatePatient(id: number, patientData: any): Observable<any> {
    return this.http.put(`${this.}/patients/${id}`, patientData);
  }

  // Método para eliminar un paciente
  deletePatient(id: number): Observable<any> {
    return this.http.delete(`${this.}/patients/${id}`);
  }*/
  seleccionarEncuesta(encuesta: String){
    this.selectSubCat.next(encuesta);
  }
}
