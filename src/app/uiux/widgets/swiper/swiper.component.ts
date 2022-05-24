import {
  Component,
  Input,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  SwiperConfigInterface,
  SwiperPaginationInterface,
  SwiperDirective,
} from 'ngx-swiper-wrapper';
import { Subject } from 'rxjs';
import { ScreenService } from '@core/service/screen.service';

// https://www.npmjs.com/package/ngx-swiper-wrapper

const paginationgConfig: SwiperPaginationInterface = {
  el: '.swiper-pagination',
  type: 'bullets',
  clickable: true,
  hideOnClick: false,
};

@Component({
  selector: 'app-swiper',
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwiperComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() content: any;
  @Input() index: number;
  @Input() navigationSub: Subject<any>;
  @ViewChild(SwiperDirective) public swiperWrapper: SwiperDirective;
  constructor(private screenService: ScreenService) {}

  defaultConfig: SwiperConfigInterface = {
    slidesPerView: 'auto',
    speed: 1000,
    scrollbar: false,
    keyboard: true,
    mousewheel: false,
    navigation: true,
    pagination: paginationgConfig,
    autoplay: true,
    // Responsive breakpoints
    // breakpoints: {
    //   // when window width is >= 320px
    //   320: {
    //     slidesPerView: 1.2,
    //     spaceBetween: 10,
    //   },
    //   // when window width is >= 480px
    //   480: {
    //     slidesPerView: 2,
    //     spaceBetween: 20,
    //   },
    //   // when window width is >= 640px
    //   640: {
    //     slidesPerView: 3,
    //     spaceBetween: 30,
    //   },
    //   768: {
    //     slidesPerView: 4,
    //     spaceBetween: 30,
    //   },
    // },
  };
  config: SwiperConfigInterface;
  ngOnInit(): void {
    this.config = Object.assign(this.defaultConfig, this.content.params);
  }
  ngAfterViewInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      if (this.navigationSub) {
        this.navigationSub.subscribe((action) => {
          if (action > 0) {
            this.swiperWrapper.nextSlide();
          } else {
            this.swiperWrapper.prevSlide();
          }
        });
      }
    }
  }
  onSwiper(swiper: any): void {
    console.log(swiper);
  }
  onSlideChange(): void {
    console.log('slide change');
  }
  ngOnDestroy(): void {
    if (this.navigationSub) {
      this.navigationSub?.unsubscribe();
    }
  }
}
