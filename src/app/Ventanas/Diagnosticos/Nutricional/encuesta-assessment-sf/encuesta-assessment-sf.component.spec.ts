import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuestaAssessmentSFComponent } from './encuesta-assessment-sf.component';

describe('EncuestaAssessmentSFComponent', () => {
  let component: EncuestaAssessmentSFComponent;
  let fixture: ComponentFixture<EncuestaAssessmentSFComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EncuestaAssessmentSFComponent]
    });
    fixture = TestBed.createComponent(EncuestaAssessmentSFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
