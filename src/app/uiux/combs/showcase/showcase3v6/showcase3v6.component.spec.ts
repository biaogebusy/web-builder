import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Showcase3v6Component } from './showcase3v6.component';

describe('Showcase3v6Component', () => {
  let component: Showcase3v6Component;
  let fixture: ComponentFixture<Showcase3v6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Showcase3v6Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Showcase3v6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
