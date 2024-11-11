import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Profile1v1Component } from './profile1v1.component';

describe('Profile1v1Component', () => {
  let component: Profile1v1Component;
  let fixture: ComponentFixture<Profile1v1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Profile1v1Component],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Profile1v1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
