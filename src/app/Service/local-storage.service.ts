import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private storageKey = 'patient_id';
  constructor() {}
  // Obtener el id del paciente
  getId(): number | null {
    const id = localStorage.getItem(this.storageKey);
    return id ? Number(id) : null;
  }

  // Establecer el id del paciente
  setId(id: number): void {
    localStorage.setItem(this.storageKey, id.toString());
  }

  // Eliminar el id del paciente
  removeId(): void {
    localStorage.removeItem(this.storageKey);
  }

  // Verificar si el id está almacenado
  hasId(): boolean {
    return this.getId() != null;
  }
}
