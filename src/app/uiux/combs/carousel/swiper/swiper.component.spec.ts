import { Component, input } from '@angular/core';
import { UtilitiesService } from '@core/service/utilities.service';
import { ComponentService } from '@core/service/component.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideUiuxMocks } from '@uiux/testing/mocks';

import { SwiperComponent } from './swiper.component';

@Component({ template: '{{ content() }}' })
class SlideFixture {
  readonly content = input<unknown>();
}

describe('SwiperComponent', () => {
  let component: SwiperComponent;
  let fixture: ComponentFixture<SwiperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwiperComponent],
      providers: [
        provideRouter([]), ...provideUiuxMocks(),
        { provide: UtilitiesService, useValue: { initAnimate: () => undefined } },
        { provide: ComponentService, useValue: {
          getCachedComponentType: () => SlideFixture, getComponentType: async () => SlideFixture,
        } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SwiperComponent);
    fixture.componentRef.setInput('content', {});
    component = fixture.componentInstance;
  });

  it('restores the selected slide after reparenting and applies index without rebuilding', async () => {
    const elements = [{ type: 'text' }, { type: 'text' }, { type: 'text' }];
    fixture.componentRef.setInput('content', {
      params: { slidesPerView: 1, speed: 0, width: 600, keyboard: false },
      elements,
    });
    fixture.componentRef.setInput('index', 1);
    fixture.detectChanges();
    await fixture.whenStable();
    const element = fixture.nativeElement.querySelector('swiper-container');
    const first = element.swiper;
    expect(first.activeIndex).toBe(1);
    fixture.componentRef.setInput('index', 2);
    fixture.detectChanges();
    expect(element.swiper).toBe(first);
    expect(first.activeIndex).toBe(2);
    element.remove();
    expect(first.destroyed).toBe(true);
    fixture.nativeElement.appendChild(element);
    expect(element.swiper.initialized).toBe(true);
    expect(element.swiper.activeIndex).toBe(2);
    const current = element.swiper;
    fixture.componentRef.setInput('content', {
      params: { slidesPerView: 1, speed: 0, width: 600, pagination: true, keyboard: false },
      elements,
    });
    fixture.detectChanges();
    await fixture.whenStable();
    expect(current.destroyed).toBe(true);
    expect(element.swiper.activeIndex).toBe(2);
    expect(element.swiper.params.pagination.enabled).not.toBe(false);
    const last = element.swiper;
    fixture.destroy();
    expect(last.destroyed).toBe(true);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
