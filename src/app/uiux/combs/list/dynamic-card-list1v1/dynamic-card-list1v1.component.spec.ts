import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicCardList1v1Component } from './dynamic-card-list1v1.component';

describe('DynamicCardList1v1Component', () => {
  let component: DynamicCardList1v1Component;
  let fixture: ComponentFixture<DynamicCardList1v1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicCardList1v1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicCardList1v1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
