import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hero1v1Component } from './hero1v1.component';

describe('Hero1v1Component', () => {
  let component: Hero1v1Component;
  let fixture: ComponentFixture<Hero1v1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Hero1v1Component],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Hero1v1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
