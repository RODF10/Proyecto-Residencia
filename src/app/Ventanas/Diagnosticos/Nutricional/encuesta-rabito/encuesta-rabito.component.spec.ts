import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuestaRabitoComponent } from './encuesta-rabito.component';

describe('EncuestaRabitoComponent', () => {
  let component: EncuestaRabitoComponent;
  let fixture: ComponentFixture<EncuestaRabitoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EncuestaRabitoComponent]
    });
    fixture = TestBed.createComponent(EncuestaRabitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
