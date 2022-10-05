import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SwiperComponent } from 'swiper/angular';
import SwiperCore, { Navigation, Pagination, SwiperOptions } from 'swiper';
// install Swiper modules
SwiperCore.use([Navigation, Pagination]);
@Component({
  selector: 'app-hero1v2',
  templateUrl: './hero1v2.component.html',
  styleUrls: ['./hero1v2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero1v2Component implements OnInit {
  @Input() content: any;
  @ViewChild('media', { static: false }) media: SwiperComponent;
  index = 0;
  mediaConfig: SwiperOptions;
  textConfig: SwiperOptions = {
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
