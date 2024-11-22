import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuestaBeckAnxietyComponent } from './encuesta-beck-anxiety.component';

describe('EncuestaBeckAnxietyComponent', () => {
  let component: EncuestaBeckAnxietyComponent;
  let fixture: ComponentFixture<EncuestaBeckAnxietyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EncuestaBeckAnxietyComponent]
    });
    fixture = TestBed.createComponent(EncuestaBeckAnxietyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
