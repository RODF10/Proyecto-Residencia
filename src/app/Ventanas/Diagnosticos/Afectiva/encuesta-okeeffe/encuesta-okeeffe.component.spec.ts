import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuestaOkeeffeComponent } from './encuesta-okeeffe.component';

describe('EncuestaOkeeffeComponent', () => {
  let component: EncuestaOkeeffeComponent;
  let fixture: ComponentFixture<EncuestaOkeeffeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EncuestaOkeeffeComponent]
    });
    fixture = TestBed.createComponent(EncuestaOkeeffeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
