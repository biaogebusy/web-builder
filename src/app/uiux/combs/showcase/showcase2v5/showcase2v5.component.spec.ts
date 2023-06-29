import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Showcase2v5Component } from './showcase2v5.component';

describe('Showcase2v5Component', () => {
  let component: Showcase2v5Component;
  let fixture: ComponentFixture<Showcase2v5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Showcase2v5Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Showcase2v5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
