import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuestaAfcComponent } from './encuesta-afc.component';

describe('EncuestaAfcComponent', () => {
  let component: EncuestaAfcComponent;
  let fixture: ComponentFixture<EncuestaAfcComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EncuestaAfcComponent]
    });
    fixture = TestBed.createComponent(EncuestaAfcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
