import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Showcase3v2Component } from './showcase3v2.component';

describe('Showcase3v2Component', () => {
  let component: Showcase3v2Component;
  let fixture: ComponentFixture<Showcase3v2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Showcase3v2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Showcase3v2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
