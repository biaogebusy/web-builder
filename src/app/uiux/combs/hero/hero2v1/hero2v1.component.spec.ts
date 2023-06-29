import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hero2v1Component } from './hero2v1.component';

describe('Hero2v1Component', () => {
  let component: Hero2v1Component;
  let fixture: ComponentFixture<Hero2v1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Hero2v1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Hero2v1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
