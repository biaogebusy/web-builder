import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Card1v2Component } from './card1v2.component';

describe('Card1v2Component', () => {
  let component: Card1v2Component;
  let fixture: ComponentFixture<Card1v2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Card1v2Component],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Card1v2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
