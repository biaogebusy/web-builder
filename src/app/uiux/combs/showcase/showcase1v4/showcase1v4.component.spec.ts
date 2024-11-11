import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Showcase1v4Component } from './showcase1v4.component';

describe('Showcase1v4Component', () => {
  let component: Showcase1v4Component;
  let fixture: ComponentFixture<Showcase1v4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Showcase1v4Component],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Showcase1v4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
