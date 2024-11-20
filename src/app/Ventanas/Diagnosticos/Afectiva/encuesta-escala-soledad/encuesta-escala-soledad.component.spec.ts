import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuestaEscalaSoledadComponent } from './encuesta-escala-soledad.component';

describe('EncuestaEscalaSoledadComponent', () => {
  let component: EncuestaEscalaSoledadComponent;
  let fixture: ComponentFixture<EncuestaEscalaSoledadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EncuestaEscalaSoledadComponent]
    });
    fixture = TestBed.createComponent(EncuestaEscalaSoledadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
