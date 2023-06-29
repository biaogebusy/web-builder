import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Showcase2v1Component } from './showcase2v1.component';

describe('Showcase2v1Component', () => {
  let component: Showcase2v1Component;
  let fixture: ComponentFixture<Showcase2v1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Showcase2v1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Showcase2v1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
