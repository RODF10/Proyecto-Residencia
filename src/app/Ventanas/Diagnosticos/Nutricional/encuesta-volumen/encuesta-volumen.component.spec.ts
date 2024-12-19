import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuestaVolumenComponent } from './encuesta-volumen.component';

describe('EncuestaVolumenComponent', () => {
  let component: EncuestaVolumenComponent;
  let fixture: ComponentFixture<EncuestaVolumenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EncuestaVolumenComponent]
    });
    fixture = TestBed.createComponent(EncuestaVolumenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
