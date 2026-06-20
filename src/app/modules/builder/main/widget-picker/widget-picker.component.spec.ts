import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetPickerComponent } from './widget-picker.component';

describe('WidgetPickerComponent', () => {
  let component: WidgetPickerComponent;
  let fixture: ComponentFixture<WidgetPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WidgetPickerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
