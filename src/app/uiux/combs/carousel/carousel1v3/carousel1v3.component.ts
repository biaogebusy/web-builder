import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import type { ICarouselBase } from '@core/interface/combs/ICarousel';

@Component({
    selector: 'app-carousel-1v3',
    templateUrl: './carousel1v3.component.html',
    styleUrls: ['./carousel1v3.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class Carousel1v3Component {
  @Input() content: ICarouselBase;
  constructor() {}

}
