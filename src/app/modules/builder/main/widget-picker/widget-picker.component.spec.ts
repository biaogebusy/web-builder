import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideBuilderMocks } from '@modules/builder/testing/mocks';

import { WidgetPickerComponent } from './widget-picker.component';

describe('WidgetPickerComponent', () => {
  let component: WidgetPickerComponent;
  let fixture: ComponentFixture<WidgetPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WidgetPickerComponent],
      providers: [provideRouter([]), ...provideBuilderMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(WidgetPickerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
