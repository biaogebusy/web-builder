import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hero2v2Component } from './hero2v2.component';

describe('Hero2v2Component', () => {
  let component: Hero2v2Component;
  let fixture: ComponentFixture<Hero2v2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Hero2v2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Hero2v2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
