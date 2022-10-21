import {
  Component,
  Input,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import SwiperCore, { Navigation, Pagination, SwiperOptions } from 'swiper';
import { SwiperComponent as SwiperCom } from 'swiper/angular';

import { Subject } from 'rxjs';
import { ScreenService } from '@core/service/screen.service';
import { PaginationOptions } from 'swiper/types';
import { ISwiper } from '@core/interface/widgets/ISwiper';

const paginationgConfig: PaginationOptions = {
  type: 'bullets',
  clickable: true,
  hideOnClick: false,
};

// install Swiper modules
SwiperCore.use([Navigation, Pagination]);

@Component({
  selector: 'app-swiper',
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwiperComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() content: ISwiper;
  @Input() index: number;
  @Input() navigationSub: Subject<any>;
  @ViewChild('swiper', { static: false }) swiper: SwiperCom;
  constructor(private screenService: ScreenService) {}

  defaultConfig: SwiperOptions = {
    slidesPerView: 'auto',
    speed: 1000,
    scrollbar: false,
    keyboard: true,
    mousewheel: false,
    navigation: true,
    pagination: paginationgConfig,
    autoplay: true,
  };
  config: SwiperOptions;
  ngOnInit(): void {
    this.config = Object.assign(this.defaultConfig, this.content.params);
  }
  ngAfterViewInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      if (this.navigationSub) {
        this.navigationSub.subscribe((action) => {
          if (action > 0) {
            this.swiper.swiperRef.slideNext();
          } else {
            this.swiper.swiperRef.slidePrev();
          }
        });
      }
    }
  }
  onSwiper(swiper: any): void {}
  onSlideChange(): void {}
  ngOnDestroy(): void {
    if (this.navigationSub && this.navigationSub.unsubscribe) {
      this.navigationSub?.unsubscribe();
    }
  }
}
