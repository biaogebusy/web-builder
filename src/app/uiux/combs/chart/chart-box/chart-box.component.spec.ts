import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideUiuxMocks } from '@uiux/testing/mocks';

import { ChartBoxComponent } from './chart-box.component';

describe('ChartBoxComponent', () => {
  let component: ChartBoxComponent;
  let fixture: ComponentFixture<ChartBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartBoxComponent],
      providers: [provideRouter([]), ...provideUiuxMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(ChartBoxComponent);
    fixture.componentRef.setInput('content', {});
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
