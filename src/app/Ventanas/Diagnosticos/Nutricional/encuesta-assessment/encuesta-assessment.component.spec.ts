import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuestaAssessmentComponent } from './encuesta-assessment.component';

describe('EncuestaAssessmentComponent', () => {
  let component: EncuestaAssessmentComponent;
  let fixture: ComponentFixture<EncuestaAssessmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EncuestaAssessmentComponent]
    });
    fixture = TestBed.createComponent(EncuestaAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
