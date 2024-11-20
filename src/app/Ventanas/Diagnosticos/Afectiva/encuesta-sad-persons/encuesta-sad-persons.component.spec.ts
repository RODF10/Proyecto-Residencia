import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuestaSADPERSONSComponent } from './encuesta-sad-persons.component';

describe('EncuestaSADPERSONSComponent', () => {
  let component: EncuestaSADPERSONSComponent;
  let fixture: ComponentFixture<EncuestaSADPERSONSComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EncuestaSADPERSONSComponent]
    });
    fixture = TestBed.createComponent(EncuestaSADPERSONSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
