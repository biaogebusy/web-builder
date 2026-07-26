import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideUiuxMocks } from '@uiux/testing/mocks';

import { FullCalendarComponent } from './full-calendar.component';

describe('FullCalendarComponent', () => {
  let component: FullCalendarComponent;
  let fixture: ComponentFixture<FullCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullCalendarComponent],
      providers: [provideRouter([]), ...provideUiuxMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(FullCalendarComponent);
    fixture.componentRef.setInput('content', {});
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
