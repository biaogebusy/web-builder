import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Showcase3v3Component } from './showcase3v3.component';

describe('Showcase3v3Component', () => {
  let component: Showcase3v3Component;
  let fixture: ComponentFixture<Showcase3v3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Showcase3v3Component],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Showcase3v3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
