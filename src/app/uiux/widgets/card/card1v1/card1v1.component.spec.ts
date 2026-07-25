import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideUiuxMocks } from '@uiux/testing/mocks';

import { Card1v1Component } from './card1v1.component';

describe('Card1v1Component', () => {
  let component: Card1v1Component;
  let fixture: ComponentFixture<Card1v1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Card1v1Component],
      providers: [provideRouter([]), ...provideUiuxMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(Card1v1Component);
    fixture.componentRef.setInput('content', {});
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
