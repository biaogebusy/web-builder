import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Card1v5Component } from './card1v5.component';

describe('Card1v5Component', () => {
  let component: Card1v5Component;
  let fixture: ComponentFixture<Card1v5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Card1v5Component],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Card1v5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
