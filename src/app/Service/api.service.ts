import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Cita } from '../Shared/Data';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private urlApi = 'http://127.0.0.1:8000/api'; // Api Laravel (Backend)

  /* SECCION CATEGORIA Y SUBCATEGORIA */
  //Selecciona Subcategoria
  private selectSubCat = new BehaviorSubject<String>('Undefinid');
  selectEncuest$: Observable<String>;
  //Selecciona la Categoria
  private categoriaSeleccionadaSource: BehaviorSubject<String> = new BehaviorSubject<String>('Undefinid');
  categoriaSeleccionada$: Observable<String>; 

  constructor(private http: HttpClient) {
    // Recuperar la categoría/encuesta seleccionada del Local Storage o establecer un valor predeterminado
    const categoriaGuardada = localStorage.getItem('categoriaSeleccionada') || 'undefinid';
    const encuestaGuardada = localStorage.getItem('encuestaSeleccionada') || 'undefined';
    // Inicializar BehaviorSubject con el valor recuperado
    this.categoriaSeleccionadaSource = new BehaviorSubject<String>(categoriaGuardada);
    this.selectSubCat = new BehaviorSubject<String>(encuestaGuardada);
    // Asignar el observable a una propiedad pública
    this.categoriaSeleccionada$ = this.categoriaSeleccionadaSource.asObservable();
    this.selectEncuest$ = this.selectSubCat.asObservable();
  }
  //Seleccion de Categoria y Encuesta
  seleccionarEncuesta(encuesta: String){
    this.selectSubCat.next(encuesta);
    localStorage.setItem('encuestaSeleccionada', encuesta.toString());
  }
  seleccionarCategoria(categoria: string){
    // Actualizar la categoría y persistirla en Local Storage
    this.categoriaSeleccionadaSource.next(categoria);
    localStorage.setItem('categoriaSeleccionada', categoria.toString());
  }

  /* SECCION DE LARAVEL DE API */
  // ADMIN
  updatePasswordD(drId: number, password: any) { 
    return this.http.post(`${this.urlApi}/doctor/${drId}/change-password`, password);
  }
  verifyDoctorPassword(doctorId: number, password: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.urlApi}/doctors/verify-password`, { doctorId, password });
  }

  // Registrar un nuevo doctor
  registerDoctor(data: FormData): Observable<any> {
    return this.http.post<any>(`${this.urlApi}/doctors`, data);
    // return this.http.post<any>(this.urlApi,data);
  }
  // Login del doctor
  loginDoctor(credentials: any): Observable<any> {
    return this.http.post<any>(this.urlApi+'/validate-password', credentials);
  }
  //Obtener los registros Tabla Doctor
  getUsers(): Observable<any> {
    return this.http.get(this.urlApi+'/doctors');
  }
  //Eliminar Doctor
  deleteDoctor(id: number): Observable<any> {
    return this.http.delete(`${this.urlApi}/doctors/${id}`);
  }
  //Obtener Doctor por id
  getDoctorId(id: number): Observable<any> {
    return this.http.get(`${this.urlApi}/doctors${id}`);
  }
  // Método para cambiar la contraseña
  changePassword(payload: { correo: string, password: string }): Observable<any> {
    return this.http.post(`${this.urlApi}/change-password`, payload);
  }
  //Actualizar perfil sin cedula duplicada
  updateDoctorProfile(doctorId: number, profileData: any): Observable<any> {
    return this.http.put<any>(`${this.urlApi}/doctors/${doctorId}`, profileData);
  }
  /* --------------------------- PACIENTE ------------------------------------- */
  //Crear Paciente
  crearPaciente(data: any): Observable<any> {
    return this.http.post<any>(`${this.urlApi}/add-patients`, data);
  }
  // Obtiene pacientes del Doctor
  getPatientsByDoctor(doctorId: number): Observable<any> {
    return this.http.get<any>(`${this.urlApi}/doctor${doctorId}/patients`);
  }
  // Obtiene el paciente por id
  getPatientById(id: number): Observable<any> {
    return this.http.get(`${this.urlApi}/patients/${id}`);
  }
  //Eliminar Paciente
  deletePatient(patientId: number): Observable<any> {
    return this.http.delete<any>(`${this.urlApi}/patients/${patientId}`);
  }
  // Actualizar Paciente
  updatePatient(profileData: any, idPatient: string): Observable<any> {
    return this.http.put<any>(`${this.urlApi}/patients/${idPatient}`, profileData);
  }

  /* ------------------------------- CITA -------------------------------------------*/
  obtenerCitas(doctorId: number): Observable<Cita[]> {
    return this.http.get<Cita[]>(`${this.urlApi}/citas/${doctorId}`);
  }
  obtenerPacientes(doctorId: number): Observable<any[]> {
      return this.http.get<any[]>(`${this.urlApi}/pacientes/${doctorId}`);
  }

  crearCita(cita: any): Observable<any> {
      return this.http.post(`${this.urlApi}/citas`, cita);
  }
  eliminarCita(id: number) {
    return this.http.delete(`${this.urlApi}/citas/${id}`);
  }

  /* ---------------------------- HISTORIAL DEL PACIENTE ------------------------------------ */
  enviarResultado(resultado: any): Observable<any> { // Método para enviar los resultados al backend
    return this.http.post<any>(`${this.urlApi}/history-medical`, resultado);
  }

  /* ---------------------------- CUIDADOR --------------------- */
  createCuidador(data: any, patient_id: string): Observable<any> {
    return this.http.put(`${this.urlApi}/cuidador/${patient_id}`, data);
  }
  getCuidador(patientId: string): Observable<any> {
    return this.http.get(`${this.urlApi}/cuidador/${patientId}`);
  }
}
