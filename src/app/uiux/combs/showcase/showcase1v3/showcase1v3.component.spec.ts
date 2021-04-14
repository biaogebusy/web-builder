import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Showcase1v3Component } from './showcase1v3.component';

describe('Showcase1v3Component', () => {
  let component: Showcase1v3Component;
  let fixture: ComponentFixture<Showcase1v3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Showcase1v3Component],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Showcase1v3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
