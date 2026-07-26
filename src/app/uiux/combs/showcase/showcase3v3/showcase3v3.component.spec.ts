import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideUiuxMocks } from '@uiux/testing/mocks';

import { Showcase3v3Component } from './showcase3v3.component';

describe('Showcase3v3Component', () => {
  let component: Showcase3v3Component;
  let fixture: ComponentFixture<Showcase3v3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Showcase3v3Component],
      providers: [provideRouter([]), ...provideUiuxMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(Showcase3v3Component);
    fixture.componentRef.setInput('content', {});
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
