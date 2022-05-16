import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Card1v3Component } from './card1v3.component';

describe('Card1v3Component', () => {
  let component: Card1v3Component;
  let fixture: ComponentFixture<Card1v3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Card1v3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Card1v3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
