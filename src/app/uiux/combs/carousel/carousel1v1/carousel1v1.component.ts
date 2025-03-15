import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import type { ICarouselBase } from '@core/interface/combs/ICarousel';

@Component({
    selector: 'app-carousel-1v1',
    templateUrl: './carousel1v1.component.html',
    styleUrls: ['./carousel1v1.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class Carousel1v1Component implements OnInit {
  @Input() content: ICarouselBase;
  constructor() {}

  ngOnInit(): void {}
}
