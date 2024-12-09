import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuestaMustComponent } from './encuesta-must.component';

describe('EncuestaMustComponent', () => {
  let component: EncuestaMustComponent;
  let fixture: ComponentFixture<EncuestaMustComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EncuestaMustComponent]
    });
    fixture = TestBed.createComponent(EncuestaMustComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
