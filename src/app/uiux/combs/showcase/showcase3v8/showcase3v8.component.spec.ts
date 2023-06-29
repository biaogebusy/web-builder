import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Showcase3v8Component } from './showcase3v8.component';

describe('Showcase3v8Component', () => {
  let component: Showcase3v8Component;
  let fixture: ComponentFixture<Showcase3v8Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Showcase3v8Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Showcase3v8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
