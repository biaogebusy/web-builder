import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Showcase3v9Component } from './showcase3v9.component';

describe('Showcase3v9Component', () => {
  let component: Showcase3v9Component;
  let fixture: ComponentFixture<Showcase3v9Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Showcase3v9Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Showcase3v9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
