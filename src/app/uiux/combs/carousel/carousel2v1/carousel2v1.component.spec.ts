import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Carousel2v1Component } from './carousel2v1.component';

describe('Carousel2v1Component', () => {
  let component: Carousel2v1Component;
  let fixture: ComponentFixture<Carousel2v1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Carousel2v1Component],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Carousel2v1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
