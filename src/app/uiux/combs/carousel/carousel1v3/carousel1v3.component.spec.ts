import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Carousel1v3Component } from './carousel1v3.component';

describe('Carousel1v3Component', () => {
  let component: Carousel1v3Component;
  let fixture: ComponentFixture<Carousel1v3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Carousel1v3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Carousel1v3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
