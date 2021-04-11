import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Showcase3v1Component } from './showcase3v1.component';

describe('Showcase3v1Component', () => {
  let component: Showcase3v1Component;
  let fixture: ComponentFixture<Showcase3v1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Showcase3v1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Showcase3v1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
