import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuestaGlimComponent } from './encuesta-glim.component';

describe('EncuestaGlimComponent', () => {
  let component: EncuestaGlimComponent;
  let fixture: ComponentFixture<EncuestaGlimComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EncuestaGlimComponent]
    });
    fixture = TestBed.createComponent(EncuestaGlimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
