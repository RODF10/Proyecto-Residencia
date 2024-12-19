import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuestaChumleaComponent } from './encuesta-chumlea.component';

describe('EncuestaChumleaComponent', () => {
  let component: EncuestaChumleaComponent;
  let fixture: ComponentFixture<EncuestaChumleaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EncuestaChumleaComponent]
    });
    fixture = TestBed.createComponent(EncuestaChumleaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
