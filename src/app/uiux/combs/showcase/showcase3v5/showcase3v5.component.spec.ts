import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Showcase3v5Component } from './showcase3v5.component';

describe('Showcase3v5Component', () => {
  let component: Showcase3v5Component;
  let fixture: ComponentFixture<Showcase3v5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Showcase3v5Component],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Showcase3v5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
