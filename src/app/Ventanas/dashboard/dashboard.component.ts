import { Component, OnInit } from '@angular/core';
import { MedicalHistory } from 'src/app/Shared/Data';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { CategoryGuard } from 'src/app/guards/category.guard';
import { ApiService } from 'src/app/Service/api.service';
import { AlertService } from 'src/app/Service/alert.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  history: any[] = [];
  filteredHistory: any[] = [];
  selectedFilter: string = ''; // Filtro seleccionado: 'fecha', 'categoria', o 'encuesta'
  filterValue: string = ''; // Filtro por valores
  filterOptions: string[] = []; // Opciones de filtro dinámicas (dependen del filtro seleccionado)

  constructor(
    private authGuard: CategoryGuard,
    private apiService: ApiService,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.permission();
    this.getHistory();
  }

  permission() {
    this.authGuard.setAccessedFromList(true);
  }
  getHistory() {
    const id = localStorage.getItem('patient_id');
    if (id && id != null) {
      this.apiService.getHistoryByNumberImss(id).subscribe(
        (data) => {
          this.history = data;
          this.filteredHistory = [...this.history];
        },
        (error) => {
          this.alert.error(
            'Error al obtener el historial del paciente',
            'Error Data'
          );
        }
      );
    }
    this.updateFilterOptions();
  }

  // Actualiza las opciones de filtro según el filtro seleccionado
  updateFilterOptions() {
    if (this.selectedFilter == 'fecha') {
      // Filtrar solo fechas únicas
      this.filterOptions = Array.from(
        new Set(this.history.map((item) => item.fecha))
      );
    } else if (this.selectedFilter == 'categoria') {
      // Filtrar categorías únicas
      this.filterOptions = Array.from(
        new Set(this.history.map((item) => item.diagnostic?.category))
      );
    } else if (this.selectedFilter == 'encuesta') {
      // Filtrar encuestas únicas
      this.filterOptions = Array.from(
        new Set(this.history.map((item) => item.encuesta))
      );
    }
  }

  // Filtrar los datos según el valor seleccionado
  filterList() {
    // Actualiza las opciones cuando el filtro cambia
    this.updateFilterOptions();

    if (!this.filterValue || this.filterValue.trim() === '') {
      // Si no hay valor de filtro seleccionado, mostrar todos los registros
      this.filteredHistory = [...this.history];
    } else {
      // Filtrar los datos según el valor seleccionado
      this.filteredHistory = this.history.filter((item) => {
        if (this.selectedFilter === 'fecha') {
          return item.fecha.includes(this.filterValue);
        } else if (this.selectedFilter === 'categoria') {
          return item.diagnostic?.category.includes(this.filterValue);
        } else if (this.selectedFilter === 'encuesta') {
          return item.encuesta.includes(this.filterValue);
        }
        return false;
      });
    }
  }
}
