import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
  inject,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import type { ICarouselBase } from '@core/interface/combs/ICarousel';
import { ISwiper } from '@core/interface/widgets/ISwiper';
import { BtnComponent } from '@uiux/widgets/btn/btn.component';
import { TitleComponent } from '@uiux/widgets/title/title.component';
import { defaultsDeep } from 'lodash-es';
import { Subject } from 'rxjs';
import { SwiperComponent } from '../swiper/swiper.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-carousel-1v2',
  templateUrl: './carousel1v2.component.html',
  styleUrls: ['./carousel1v2.component.scss'],
  imports: [TitleComponent, BtnComponent, SwiperComponent],
})
export class Carousel1v2Component implements AfterViewInit {
  @Input() content: ICarouselBase;
  swiper = signal<ISwiper>({ params: {}, elements: [], classes: '' });
  navigation$ = new Subject<number>();
  ele = inject(ElementRef);

  ngAfterViewInit(): void {
    const prevEl = this.ele.nativeElement.querySelector('.prev');
    const nextEl = this.ele.nativeElement.querySelector('.next');
    this.swiper.set(
      defaultsDeep(
        {
          params: {
            navigation: {
              prevEl,
              nextEl,
            },
          },
          elements: [],
        },
        this.content.swiper
      )
    );
  }
  onPrev(): void {
    this.navigation$.next(-1);
  }
  onNext(): void {
    this.navigation$.next(1);
  }
}
