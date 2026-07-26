import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideUiuxMocks } from '@uiux/testing/mocks';

import { SwiperComponent } from './swiper.component';

describe('SwiperComponent', () => {
  let component: SwiperComponent;
  let fixture: ComponentFixture<SwiperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwiperComponent],
      providers: [provideRouter([]), ...provideUiuxMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(SwiperComponent);
    fixture.componentRef.setInput('content', {});
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
