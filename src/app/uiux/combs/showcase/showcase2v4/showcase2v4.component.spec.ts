import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Showcase2v4Component } from './showcase2v4.component';

describe('Showcase2v4Component', () => {
  let component: Showcase2v4Component;
  let fixture: ComponentFixture<Showcase2v4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Showcase2v4Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Showcase2v4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
