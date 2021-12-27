import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Showcase2v3Component } from './showcase2v3.component';

describe('Showcase2v3Component', () => {
  let component: Showcase2v3Component;
  let fixture: ComponentFixture<Showcase2v3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Showcase2v3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Showcase2v3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
