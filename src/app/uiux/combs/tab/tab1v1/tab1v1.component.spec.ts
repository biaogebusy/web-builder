import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tab1v1Component } from './tab1v1.component';

describe('Tab1v1Component', () => {
  let component: Tab1v1Component;
  let fixture: ComponentFixture<Tab1v1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Tab1v1Component],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Tab1v1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
