import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private urlApi = 'http://192.168.1.80:8000/api';

  /* SECCION CATEGORIA Y SUBCATEGORIA */
  //Selecciona Subcategoria
  private selectSubCat = new BehaviorSubject<String>('Undefinid');
  selectEncuest$ = this.selectSubCat.asObservable();
  //Selecciona la Categoria
  private categoriaSeleccionadaSource: BehaviorSubject<String> = new BehaviorSubject<String>('Undefinid');
  categoriaSeleccionada$: Observable<String>; 

  constructor(private http: HttpClient) {
    // Recuperar la categoría seleccionada del Local Storage o establecer un valor predeterminado
    const categoriaGuardada = localStorage.getItem('categoriaSeleccionada') || 'undefinid';
    // Inicializar BehaviorSubject con el valor recuperado
    this.categoriaSeleccionadaSource = new BehaviorSubject<String>(categoriaGuardada);
    // Asignar el observable a una propiedad pública
    this.categoriaSeleccionada$ = this.categoriaSeleccionadaSource.asObservable();
  }
  seleccionarEncuesta(encuesta: String){
    this.selectSubCat.next(encuesta);
  }

  seleccionarCategoria(categoria: string){
    // Actualizar la categoría y persistirla en Local Storage
    this.categoriaSeleccionadaSource.next(categoria);
    localStorage.setItem('categoriaSeleccionada', categoria.toString());
  }

  /* SECCION DE LARAVEL DE API */

  // Registrar un nuevo doctor
  registerDoctor(data: FormData): Observable<any> {
    return this.http.post<any>(`${this.urlApi}/doctors`, data);
    // return this.http.post<any>(this.urlApi,data);
  }

  // Login del doctor
  loginDoctor(credentials: any): Observable<any> {
    return this.http.post<any>(this.urlApi+'/validate-password', credentials);
  }

  getUsers(): Observable<any> {
    return this.http.get(this.urlApi+'/doctors');
  }
}
