import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Showcase2v6Component } from './showcase2v6.component';

describe('Showcase2v6Component', () => {
  let component: Showcase2v6Component;
  let fixture: ComponentFixture<Showcase2v6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Showcase2v6Component],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Showcase2v6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
