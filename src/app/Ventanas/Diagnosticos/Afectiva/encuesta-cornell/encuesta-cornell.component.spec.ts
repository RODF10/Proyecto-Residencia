import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuestaCornellComponent } from './encuesta-cornell.component';

describe('EncuestaCornellComponent', () => {
  let component: EncuestaCornellComponent;
  let fixture: ComponentFixture<EncuestaCornellComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EncuestaCornellComponent]
    });
    fixture = TestBed.createComponent(EncuestaCornellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
