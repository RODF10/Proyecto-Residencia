import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuestaCogComponent } from './encuesta-cog.component';

describe('EncuestaCogComponent', () => {
  let component: EncuestaCogComponent;
  let fixture: ComponentFixture<EncuestaCogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EncuestaCogComponent]
    });
    fixture = TestBed.createComponent(EncuestaCogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
