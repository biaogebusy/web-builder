import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Carousel1v1Component } from './carousel1v1.component';

describe('Carousel1v1Component', () => {
  let component: Carousel1v1Component;
  let fixture: ComponentFixture<Carousel1v1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Carousel1v1Component],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Carousel1v1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
