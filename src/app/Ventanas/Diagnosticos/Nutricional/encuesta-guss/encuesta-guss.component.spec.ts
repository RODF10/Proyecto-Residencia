import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuestaGussComponent } from './encuesta-guss.component';

describe('EncuestaGussComponent', () => {
  let component: EncuestaGussComponent;
  let fixture: ComponentFixture<EncuestaGussComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EncuestaGussComponent]
    });
    fixture = TestBed.createComponent(EncuestaGussComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
