import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hero1v2Component } from './hero1v2.component';

describe('Hero1v2Component', () => {
  let component: Hero1v2Component;
  let fixture: ComponentFixture<Hero1v2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Hero1v2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Hero1v2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
