import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hero2v3Component } from './hero2v3.component';

describe('Hero2v3Component', () => {
  let component: Hero2v3Component;
  let fixture: ComponentFixture<Hero2v3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Hero2v3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Hero2v3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
