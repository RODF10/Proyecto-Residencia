import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuestaGaiSfComponent } from './encuesta-gai-sf.component';

describe('EncuestaGaiSfComponent', () => {
  let component: EncuestaGaiSfComponent;
  let fixture: ComponentFixture<EncuestaGaiSfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EncuestaGaiSfComponent]
    });
    fixture = TestBed.createComponent(EncuestaGaiSfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
