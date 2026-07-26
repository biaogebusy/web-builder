import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideUiuxMocks } from '@uiux/testing/mocks';

import { NumberAnimateComponent } from './number-animate.component';

describe('NumberAnimateComponent', () => {
  let component: NumberAnimateComponent;
  let fixture: ComponentFixture<NumberAnimateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumberAnimateComponent],
      providers: [provideRouter([]), ...provideUiuxMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(NumberAnimateComponent);
    fixture.componentRef.setInput('content', {});
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
