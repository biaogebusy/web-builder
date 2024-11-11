import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Card1v4Component } from './card1v4.component';

describe('Card1v4Component', () => {
  let component: Card1v4Component;
  let fixture: ComponentFixture<Card1v4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Card1v4Component],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Card1v4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
