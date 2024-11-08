import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private urlApi = 'http://127.0.0.1:8000/web';

  constructor(private http: HttpClient) { }

  registerPacient(userData: any):Observable<any> {
    return this.http.post(`${this.urlApi}/pacientes`, userData);
  }
}
