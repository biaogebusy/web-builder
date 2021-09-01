import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Action1v1Component } from './action1v1.component';

describe('Action1v1Component', () => {
  let component: Action1v1Component;
  let fixture: ComponentFixture<Action1v1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Action1v1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Action1v1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
