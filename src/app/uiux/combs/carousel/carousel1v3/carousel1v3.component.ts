import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import type { ICarouselBase } from '@core/interface/combs/ICarousel';

@Component({
  selector: 'app-carousel1v3',
  templateUrl: './carousel1v3.component.html',
  styleUrls: ['./carousel1v3.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Carousel1v3Component implements OnInit {
  @Input() content: ICarouselBase;
  constructor() {}

  ngOnInit(): void {}
}
