import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideUiuxMocks } from '@uiux/testing/mocks';

import { Profile1v1Component } from './profile1v1.component';

describe('Profile1v1Component', () => {
  let component: Profile1v1Component;
  let fixture: ComponentFixture<Profile1v1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Profile1v1Component],
      providers: [provideRouter([]), ...provideUiuxMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(Profile1v1Component);
    fixture.componentRef.setInput('content', {});
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
