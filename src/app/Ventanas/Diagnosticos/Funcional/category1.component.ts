import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ResultadoService } from 'src/app/Service/resultado.service';
import { FormBuilder } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DiagnosticComponent } from '../../diagnostic/diagnostic.component';
import { ApiService } from 'src/app/Service/api.service';

interface EncuestaForm {
  alimentacion: FormControl<number>;
  banarse: FormControl<number>;
  vestirse: FormControl<number>;
  arreglarse: FormControl<number>;
  deposiciones: FormControl<number>;
  miccion: FormControl<number>;
  retrete: FormControl<number>;
  sillonCama: FormControl<number>;
  deambulacion: FormControl<number>;
  escalones: FormControl<number>;
}

@Component({
  selector: 'app-category1',
  templateUrl: './category1.component.html',
  styleUrls: ['./category1.component.scss'],
})
export class Category1Component implements OnInit {
  encuestaSelect?: String;
  @ViewChild('katz') katz!: ElementRef;
  @ViewChild('barthel') barthel!: ElementRef;
  @ViewChild('lawton') lawton!: ElementRef;

  encuestaForm: FormGroup;
  puntajeTotal: number = 0;
  observacion: string = '';
  mostrarResultado: boolean = false;
  categoria?: String;

  constructor(private fb: FormBuilder, private encuestaService: ApiService, private roter: Router, private route: ActivatedRoute, private render: Renderer2) {
    this.encuestaForm = this.fb.group({
      alimentacion: new FormControl(0),
      banarse: new FormControl(0),
      vestirse: new FormControl(0),
      arreglarse: new FormControl(0),
      deposiciones: new FormControl(0),
      miccion: new FormControl(0),
      retrete: new FormControl(0),
      sillonCama: new FormControl(0),
      deambulacion: new FormControl(0),
      escalones: new FormControl(0),
    });
  }

  ngOnInit(): void {
    this.categoria = this.route.snapshot.paramMap.get('categoria')!;
    this.encuestaService.selectEncuest$.subscribe(cat => {
      this.encuestaSelect = cat;
      console.log(`Categoria recibida en Category1Component: ${this.encuestaSelect}`); // Debug
      //this.mostrarEncuesta(cat);
    });
  }

  // En el componente 'Category1Component'
  calcularPuntaje() {
    // Suma los valores de todas las respuestas seleccionadas
    //this.puntajeTotal = Object.values(this.encuestaForm.value).reduce((a, b) => a + b, 0);

    // Asigna una observación según el puntaje
    if (this.puntajeTotal >= 60) {
      this.observacion = 'El paciente es independiente.';
    } else if (this.puntajeTotal >= 30) {
      this.observacion = 'El paciente es parcialmente dependiente.';
    } else {
      this.observacion = 'El paciente es dependiente.';
    }

    // Muestra el componente Resultado
    this.mostrarResultado = true;

    // Enviar los datos al componente Resultado a través de la navegación
    this.roter.navigate(['home/resultado'], {
      state: {
        nombreEncuesta: 'Funcionalidad', // Nombre de la encuesta
        puntaje: this.puntajeTotal,
        observacion: this.observacion,
      },
    });
  }

  cambiarCategoria(categoria: String){
    this.encuestaSelect = categoria.toString();
  }

  /*mostrarEncuesta(categoria: String) {
    // Oculta todos los divs
    this.katz.nativeElement.style.display = 'none';
    this.barthel.nativeElement.style.display = 'none';
    this.lawton.nativeElement.style.display = 'none';

    // Muestra solo el div seleccionado
    if (categoria === 'katz') {
      this.katz.nativeElement.style.display = 'block';
    } else if (categoria === 'barthel') {
      this.barthel.nativeElement.style.display = 'block';
    } else if (categoria === 'lawton') {
      this.lawton.nativeElement.style.display = 'block';
    }
  }*/
}
