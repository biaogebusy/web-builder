import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Showcase3v4Component } from './showcase3v4.component';

describe('Showcase3v4Component', () => {
  let component: Showcase3v4Component;
  let fixture: ComponentFixture<Showcase3v4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Showcase3v4Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Showcase3v4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
