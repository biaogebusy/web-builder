import { ComponentFixture, TestBed } from '@angular/core/testing';

import { List2v1Component } from './list2v1.component';

describe('List2v1Component', () => {
  let component: List2v1Component;
  let fixture: ComponentFixture<List2v1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ List2v1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(List2v1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
