import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupSelectComponent } from './widget-picker.component';

describe('WidgetPickerComponent', () => {
  let component: PopupSelectComponent;
  let fixture: ComponentFixture<PopupSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupSelectComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
