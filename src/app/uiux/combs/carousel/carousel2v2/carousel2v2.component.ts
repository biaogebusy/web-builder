import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import type { ICarouselBase } from '@core/interface/combs/ICarousel';

@Component({
    selector: 'app-carousel-2v2',
    templateUrl: './carousel2v2.component.html',
    styleUrls: ['./carousel2v2.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class Carousel2v2Component {
  @Input() content: ICarouselBase;
  constructor() {}

}
