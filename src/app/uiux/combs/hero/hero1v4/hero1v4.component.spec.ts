import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hero1v4Component } from './hero1v4.component';

describe('Hero1v4Component', () => {
  let component: Hero1v4Component;
  let fixture: ComponentFixture<Hero1v4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Hero1v4Component],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Hero1v4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
