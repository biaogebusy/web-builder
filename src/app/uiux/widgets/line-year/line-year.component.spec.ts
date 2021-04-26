import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineYearComponent } from './line-year.component';

describe('LineYearComponent', () => {
  let component: LineYearComponent;
  let fixture: ComponentFixture<LineYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineYearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
