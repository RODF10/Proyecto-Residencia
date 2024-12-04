import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuestaSarcFComponent } from './encuesta-sarc-f.component';

describe('EncuestaSarcFComponent', () => {
  let component: EncuestaSarcFComponent;
  let fixture: ComponentFixture<EncuestaSarcFComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EncuestaSarcFComponent]
    });
    fixture = TestBed.createComponent(EncuestaSarcFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
