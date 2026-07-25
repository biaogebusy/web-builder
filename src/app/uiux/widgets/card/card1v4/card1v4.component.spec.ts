import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideUiuxMocks } from '@uiux/testing/mocks';

import { Card1v4Component } from './card1v4.component';

describe('Card1v4Component', () => {
  let component: Card1v4Component;
  let fixture: ComponentFixture<Card1v4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Card1v4Component],
      providers: [provideRouter([]), ...provideUiuxMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(Card1v4Component);
    fixture.componentRef.setInput('content', {});
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
