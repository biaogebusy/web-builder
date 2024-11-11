import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Card1v1Component } from './card1v1.component';

describe('Card1v1Component', () => {
  let component: Card1v1Component;
  let fixture: ComponentFixture<Card1v1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Card1v1Component],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Card1v1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
