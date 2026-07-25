import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideUiuxMocks } from '@uiux/testing/mocks';

import { Tab1v1Component } from './tab1v1.component';

describe('Tab1v1Component', () => {
  let component: Tab1v1Component;
  let fixture: ComponentFixture<Tab1v1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tab1v1Component],
      providers: [provideRouter([]), ...provideUiuxMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(Tab1v1Component);
    fixture.componentRef.setInput('content', {});
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
