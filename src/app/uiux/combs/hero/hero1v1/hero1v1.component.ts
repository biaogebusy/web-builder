import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import type { IHero1v1 } from '@core/interface/combs/IHero';
import { SwiperComponent } from '@uiux/combs/carousel/swiper/swiper.component';

@Component({
  selector: 'app-hero-1v1',
  templateUrl: './hero1v1.component.html',
  styleUrls: ['./hero1v1.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SwiperComponent],
})
export class Hero1v1Component {
  @Input() content: IHero1v1;
  constructor() {}
}
