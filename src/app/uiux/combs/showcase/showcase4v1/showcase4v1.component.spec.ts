import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideUiuxMocks } from '@uiux/testing/mocks';

import { Showcase4v1Component } from './showcase4v1.component';

describe('Showcase4v1Component', () => {
  let component: Showcase4v1Component;
  let fixture: ComponentFixture<Showcase4v1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Showcase4v1Component],
      providers: [provideRouter([]), ...provideUiuxMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(Showcase4v1Component);
    fixture.componentRef.setInput('content', {});
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
