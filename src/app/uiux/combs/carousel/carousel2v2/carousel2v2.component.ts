import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import type { ICarouselBase } from '@core/interface/combs/ICarousel';
import { TitleComponent } from '@uiux/widgets/title/title.component';
import { SwiperComponent } from '../swiper/swiper.component';

@Component({
  selector: 'app-carousel-2v2',
  templateUrl: './carousel2v2.component.html',
  styleUrls: ['./carousel2v2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TitleComponent, SwiperComponent],
})
export class Carousel2v2Component {
  @Input() content: ICarouselBase;
  constructor() {}
}
