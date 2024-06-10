import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import type { IHero1v2 } from '@core/interface/combs/IHero';
// install Swiper modules
@Component({
  selector: 'app-hero-1v2',
  templateUrl: './hero1v2.component.html',
  styleUrls: ['./hero1v2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero1v2Component implements OnInit {
  @Input() content: IHero1v2;
  @ViewChild('media', { static: false }) media: any;
  index = 0;
  mediaConfig: any;
  textConfig: any = {
    slidesPerView: 1,
    autoplay: true,
  };
  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.setConfig();
  }

  onSlideChange(event: any): void {
    this.index = event.activeIndex;
    this.cd.detectChanges();
  }

  setConfig(): void {
    this.mediaConfig = Object.assign({}, this.content.sliders.params);
    this.cd.detectChanges();
  }
}
