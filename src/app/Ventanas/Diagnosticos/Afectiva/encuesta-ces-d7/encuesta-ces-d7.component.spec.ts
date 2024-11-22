import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuestaCESD7Component } from './encuesta-ces-d7.component';

describe('EncuestaCESD7Component', () => {
  let component: EncuestaCESD7Component;
  let fixture: ComponentFixture<EncuestaCESD7Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EncuestaCESD7Component]
    });
    fixture = TestBed.createComponent(EncuestaCESD7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
