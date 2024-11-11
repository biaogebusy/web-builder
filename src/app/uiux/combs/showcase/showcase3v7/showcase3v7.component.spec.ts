import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Showcase3v7Component } from './showcase3v7.component';

describe('Showcase3v7Component', () => {
  let component: Showcase3v7Component;
  let fixture: ComponentFixture<Showcase3v7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Showcase3v7Component],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Showcase3v7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
