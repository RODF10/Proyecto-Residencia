import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuestaPhq9Component } from './encuesta-phq9.component';

describe('EncuestaPhq9Component', () => {
  let component: EncuestaPhq9Component;
  let fixture: ComponentFixture<EncuestaPhq9Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EncuestaPhq9Component]
    });
    fixture = TestBed.createComponent(EncuestaPhq9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
