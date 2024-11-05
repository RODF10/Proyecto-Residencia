import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileMedicComponent } from './profile-medic.component';

describe('ProfileMedicComponent', () => {
  let component: ProfileMedicComponent;
  let fixture: ComponentFixture<ProfileMedicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileMedicComponent]
    });
    fixture = TestBed.createComponent(ProfileMedicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
