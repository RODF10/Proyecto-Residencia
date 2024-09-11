import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Category1Component } from './category1.component';

describe('Category1Component', () => {
  let component: Category1Component;
  let fixture: ComponentFixture<Category1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Category1Component]
    });
    fixture = TestBed.createComponent(Category1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
