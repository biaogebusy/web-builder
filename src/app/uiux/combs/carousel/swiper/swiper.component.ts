import {
  Component,
  Input,
  OnInit,
  ViewChild,
  AfterViewInit,
  inject,
  OnChanges,
  SimpleChanges,
  DestroyRef,
  output,
  afterNextRender,
} from '@angular/core';

import { Subject } from 'rxjs';
import { ScreenService } from '@core/service/screen.service';
import type { ISwiper } from '@core/interface/widgets/ISwiper';
import { register } from 'swiper/element/bundle';
import { Swiper } from 'swiper/types';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UtilitiesService } from '@core/service/utilities.service';
register();
@Component({
  selector: 'app-swiper',
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.scss'],
  standalone: false,
})
export class SwiperComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() content: ISwiper;
  @Input() index: number;
  @Input() navigationSub: Subject<number>;
  readonly slideChange = output<Swiper>();
  readonly slideClick = output<any>();
  @ViewChild('swiper', { static: false }) swiper: any;
  private destroyRef = inject(DestroyRef);
  private screenService = inject(ScreenService);
  private util = inject(UtilitiesService);

  private defaultConfig = {
    slidesPerView: 'auto',
    speed: 1000,
    scrollbar: false,
    keyboard: true,
    mousewheel: false,
    navigation: true,
    autoplay: true,
    injectStyles: [
      `
      .swiper-button-next,
      .swiper-button-prev {
        height:24px;
        width:24px;
      }
      `,
    ],
  };
  private config: any;

  constructor() {
    afterNextRender(() => {
      const swiperEle = this.swiper.nativeElement;
      Object.assign(swiperEle, this.config);
      swiperEle.initialize();
      swiperEle.classList.add(this.content?.classes);
      swiperEle.addEventListener('swiperslidechange', (event: any) => {
        const [swiper] = event.detail;
        this.slideChange.emit(swiper);
      });
      if (this.navigationSub) {
        this.navigationSub.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(action => {
          if (action > 0) {
            swiperEle.swiper.slideNext();
          } else {
            swiperEle.swiper.slidePrev();
          }
        });
      }
    });
  }
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
    this.config = Object.assign(this.defaultConfig, this.content?.params, customPagination);
  }
  async ngAfterViewInit(): Promise<void> {
    if (this.screenService.isPlatformBrowser()) {
      await this.util.loadStyle('/assets/injects/swiper/swiper-bundle.min.css');
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes?.index?.firstChange) {
      if (typeof this.index !== 'undefined') {
        this.swiper.nativeElement.swiper.slideTo(changes.index.currentValue);
      }
    }
  }
  onClick(slide: any): void {
    this.slideClick.emit(slide);
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
}
