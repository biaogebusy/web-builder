import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewChild,
  inject,
  input
} from '@angular/core';
import type { IHero1v2 } from '@core/interface/combs/IHero';
import { SwiperComponent } from '@uiux/combs/carousel/swiper/swiper.component';
@Component({
  selector: 'app-hero-1v2',
  templateUrl: './hero1v2.component.html',
  styleUrls: ['./hero1v2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SwiperComponent],
})
export class Hero1v2Component {
  private cd = inject(ChangeDetectorRef);

  readonly content = input<IHero1v2>();
  index = 0;


  onSlideChange(event: any): void {
    this.index = event.activeIndex;
    this.cd.detectChanges();
  }
}
