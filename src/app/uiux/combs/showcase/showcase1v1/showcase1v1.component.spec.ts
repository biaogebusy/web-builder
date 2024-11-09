import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Showcase1v1Component } from './showcase1v1.component';

describe('Showcase1v1Component', () => {
  let component: Showcase1v1Component;
  let fixture: ComponentFixture<Showcase1v1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Showcase1v1Component],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Showcase1v1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
