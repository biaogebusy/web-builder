import {
  ChangeDetectionStrategy,
  Component,
  input
} from '@angular/core';
import type { ICarouselBase } from '@core/interface/combs/ICarousel';
import { SpacerComponent } from '@uiux/widgets/spacer/spacer.component';
import { TextComponent } from '@uiux/widgets/text/text.component';
import { SwiperComponent } from '../swiper/swiper.component';

@Component({
  selector: 'app-carousel-1v3',
  templateUrl: './carousel1v3.component.html',
  styleUrls: ['./carousel1v3.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TextComponent, SpacerComponent, SwiperComponent],
})
export class Carousel1v3Component {
  readonly content = input<ICarouselBase>();
  constructor() {}
}
