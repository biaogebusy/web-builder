import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Showcase2v2Component } from './showcase2v2.component';

describe('Showcase2v2Component', () => {
  let component: Showcase2v2Component;
  let fixture: ComponentFixture<Showcase2v2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Showcase2v2Component],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Showcase2v2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
