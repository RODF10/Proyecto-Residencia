import { Component } from '@angular/core';

@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.scss']
})

export class TestListComponent {
  tests = [
    { title: 'Test de Memoria', description: 'Este test evalúa la capacidad de recordar información a corto plazo.' },
    { title: 'Test de Coordinación', description: 'Mide la habilidad de la persona para realizar tareas que requieren coordinación.' },
    { title: 'Test de Movilidad', description: 'Se enfoca en la capacidad de movimiento y equilibrio del individuo.' },
    { title: 'Cuidados paliativos', description: 'Los cuidados paliativos son un enfoque integral de atención médica destinado a mejorar la calidad de vida de pacientes que enfrentan enfermedades graves, crónicas o terminales.' },
    { title: 'Test de equilibrio', description: 'es una evaluación diseñada para medir la capacidad de una persona para mantener la estabilidad y el control postural en diversas situaciones.' }
    // Agregar más tests
  ];
}
