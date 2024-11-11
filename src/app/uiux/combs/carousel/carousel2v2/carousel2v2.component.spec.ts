import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Carousel2v2Component } from './carousel2v2.component';

describe('Carousel2v2Component', () => {
  let component: Carousel2v2Component;
  let fixture: ComponentFixture<Carousel2v2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Carousel2v2Component],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Carousel2v2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
