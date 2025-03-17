import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import type { ICarouselBase } from '@core/interface/combs/ICarousel';

@Component({
    selector: 'app-carousel-2v1',
    templateUrl: './carousel2v1.component.html',
    styleUrls: ['./carousel2v1.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class Carousel2v1Component implements OnInit {
  @Input() content: ICarouselBase;
  constructor() {}

  ngOnInit(): void {}
}
