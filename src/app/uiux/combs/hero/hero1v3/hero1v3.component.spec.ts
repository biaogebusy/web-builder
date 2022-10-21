import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hero1v3Component } from './hero1v3.component';

describe('Hero1v3Component', () => {
  let component: Hero1v3Component;
  let fixture: ComponentFixture<Hero1v3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Hero1v3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Hero1v3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
