import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuestaEat10Component } from './encuesta-eat10.component';

describe('EncuestaEat10Component', () => {
  let component: EncuestaEat10Component;
  let fixture: ComponentFixture<EncuestaEat10Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EncuestaEat10Component]
    });
    fixture = TestBed.createComponent(EncuestaEat10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
