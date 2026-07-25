import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideUiuxMocks } from '@uiux/testing/mocks';

import { Carousel1v2Component } from './carousel1v2.component';

describe('Carousel1v2Component', () => {
  let component: Carousel1v2Component;
  let fixture: ComponentFixture<Carousel1v2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Carousel1v2Component],
      providers: [provideRouter([]), ...provideUiuxMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(Carousel1v2Component);
    fixture.componentRef.setInput('content', {});
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
