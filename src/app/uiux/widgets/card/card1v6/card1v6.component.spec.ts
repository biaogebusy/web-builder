import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Card1v6Component } from './card1v6.component';

describe('Card1v6Component', () => {
  let component: Card1v6Component;
  let fixture: ComponentFixture<Card1v6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Card1v6Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Card1v6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
