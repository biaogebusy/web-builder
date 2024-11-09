import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberAnimateComponent } from './number-animate.component';

describe('NumberAnimateComponent', () => {
  let component: NumberAnimateComponent;
  let fixture: ComponentFixture<NumberAnimateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NumberAnimateComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberAnimateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
