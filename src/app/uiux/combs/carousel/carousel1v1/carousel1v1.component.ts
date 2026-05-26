import {
  Component,
  ChangeDetectionStrategy,
  input
} from '@angular/core';
import type { ICarouselBase } from '@core/interface/combs/ICarousel';
import { TitleComponent } from '@uiux/widgets/title/title.component';
import { SwiperComponent } from '../swiper/swiper.component';

@Component({
  selector: 'app-carousel-1v1',
  templateUrl: './carousel1v1.component.html',
  styleUrls: ['./carousel1v1.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TitleComponent, SwiperComponent],
})
export class Carousel1v1Component {
  readonly content = input<ICarouselBase>();
  constructor() {}
}
