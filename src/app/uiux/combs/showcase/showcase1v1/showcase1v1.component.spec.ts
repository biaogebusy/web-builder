import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideUiuxMocks } from '@uiux/testing/mocks';

import { Showcase1v1Component } from './showcase1v1.component';

describe('Showcase1v1Component', () => {
  let component: Showcase1v1Component;
  let fixture: ComponentFixture<Showcase1v1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Showcase1v1Component],
      providers: [provideRouter([]), ...provideUiuxMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(Showcase1v1Component);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
