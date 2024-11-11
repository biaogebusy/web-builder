import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Carousel1v2Component } from './carousel1v2.component';

describe('Carousel1v2Component', () => {
  let component: Carousel1v2Component;
  let fixture: ComponentFixture<Carousel1v2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Carousel1v2Component],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Carousel1v2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
