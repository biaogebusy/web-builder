import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListThinComponent } from './list-thin.component';

describe('ListThinComponent', () => {
  let component: ListThinComponent;
  let fixture: ComponentFixture<ListThinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListThinComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListThinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
