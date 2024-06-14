import {
  Component,
  Input,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';

import { Subject } from 'rxjs';
import { ScreenService } from '@core/service/screen.service';
import type { ISwiper } from '@core/interface/widgets/ISwiper';
import { register } from 'swiper/element/bundle';
register();
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
  @ViewChild('swiper', { static: false }) swiper: any;
  constructor(private screenService: ScreenService) {}

  defaultConfig = {
    slidesPerView: 'auto',
    speed: 1000,
    scrollbar: false,
    keyboard: true,
    mousewheel: false,
    navigation: true,
    autoplay: true,
  };
  config: any;
  ngOnInit(): void {
    let customPagination = {};
    if (this.content?.custom?.pagination?.bulletsStyle) {
      customPagination = {
        pagination: {
          type: 'bullets',
          bulletActiveClass: 'bullets-custom-style-active',
          clickable: true,
        },
      };
    }
    this.config = Object.assign(
      this.defaultConfig,
      this.content.params,
      customPagination,
    );
  }
  ngAfterViewInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      Object.assign(this.swiper.nativeElement, this.config);
      this.swiper.nativeElement.initialize();
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

  onpaginationRender(swiper: any): void {
    if (this.content?.custom?.pagination?.bulletsStyle) {
      const {
        pagination: { bullets },
      } = swiper;
      this.content.custom.pagination.bulletsStyle.forEach((item, index) => {
        Object.keys(item).forEach((key) => {
          if (bullets[index]) {
            bullets[index].style[key] =
              typeof item[key] === 'string' ? item[key] : item[key].toString();
          }
        });
      });
    }
  }

  ngOnDestroy(): void {
    if (this.navigationSub && this.navigationSub.unsubscribe) {
      this.navigationSub?.unsubscribe();
    }
  }
}
