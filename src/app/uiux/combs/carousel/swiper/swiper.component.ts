import {
  Component,
  Input,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  Output,
  EventEmitter,
  inject,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import { Subject } from 'rxjs';
import { ScreenService } from '@core/service/screen.service';
import type { ISwiper } from '@core/interface/widgets/ISwiper';
import { register } from 'swiper/element/bundle';
import { Swiper } from 'swiper/types';
register();
@Component({
  selector: 'app-swiper',
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.scss'],
})
export class SwiperComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @Input() content: ISwiper;
  @Input() index: number;
  @Input() navigationSub: Subject<any>;
  @Output() slideChange = new EventEmitter<Swiper>();
  @ViewChild('swiper', { static: false }) swiper: any;
  screenService = inject(ScreenService);

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
    this.config = Object.assign(this.defaultConfig, this.content.params, customPagination);
  }
  ngAfterViewInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      Object.assign(this.swiper.nativeElement, this.config);
      this.swiper.nativeElement.initialize();
      this.swiper.nativeElement.addEventListener('swiperslidechange', (event: any) => {
        const [swiper] = event.detail;
        this.slideChange.emit(swiper);
      });
      if (this.navigationSub) {
        this.navigationSub.subscribe(action => {
          if (action > 0) {
            this.swiper.swiperRef.slideNext();
          } else {
            this.swiper.swiperRef.slidePrev();
          }
        });
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes?.index?.firstChange) {
      if (typeof this.index !== 'undefined') {
        this.swiper.nativeElement.swiper.slideTo(changes.index.currentValue);
      }
    }
  }

  onpaginationRender(swiper: any): void {
    if (this.content?.custom?.pagination?.bulletsStyle) {
      const {
        pagination: { bullets },
      } = swiper;
      this.content.custom.pagination.bulletsStyle.forEach((item, index) => {
        Object.keys(item).forEach(key => {
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
