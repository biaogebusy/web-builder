import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Showcase4v1Component } from './showcase4v1.component';

describe('Showcase4v1Component', () => {
  let component: Showcase4v1Component;
  let fixture: ComponentFixture<Showcase4v1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Showcase4v1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Showcase4v1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
