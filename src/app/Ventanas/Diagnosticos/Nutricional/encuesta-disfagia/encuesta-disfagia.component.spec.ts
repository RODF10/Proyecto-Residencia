import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuestaDisfagiaComponent } from './encuesta-disfagia.component';

describe('EncuestaDisfagiaComponent', () => {
  let component: EncuestaDisfagiaComponent;
  let fixture: ComponentFixture<EncuestaDisfagiaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EncuestaDisfagiaComponent]
    });
    fixture = TestBed.createComponent(EncuestaDisfagiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
