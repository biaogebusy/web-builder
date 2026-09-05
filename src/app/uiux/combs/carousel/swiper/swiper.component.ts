import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  OnInit,
  AfterViewInit,
  effect,
  inject,
  input,
  DestroyRef,
  output,
  afterNextRender,
  ChangeDetectionStrategy,
  viewChild,
  Injector,
} from '@angular/core';

import { getLibraryAsset } from '@core/config/library-assets';
import { Subject } from 'rxjs';
import { ScreenService } from '@core/service/screen.service';
import type { ISwiper } from '@core/interface/widgets/ISwiper';
import { register } from 'swiper/element/bundle';
import { Swiper } from 'swiper/types';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UtilitiesService } from '@core/service/utilities.service';
import { ICoreConfig } from '@core/interface/IAppConfig';
import { CORE_CONFIG } from '@core/token/token-providers';
import { DynamicComponentComponent } from '@uiux/widgets/builder/dynamic-component/dynamic-component.component';
import { SWIPER_ASSETS } from './swiper.assets';
register();
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-swiper',
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.scss'],
  imports: [DynamicComponentComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SwiperComponent implements OnInit, AfterViewInit {
  readonly content = input.required<ISwiper>();
  readonly index = input<number>();
  readonly navigationSub = input<Subject<number>>();
  readonly slideChange = output<Swiper>();
  readonly slideClick = output<any>();
  readonly swiper = viewChild<any>('swiper');
  private destroyRef = inject(DestroyRef);
  private screenService = inject(ScreenService);
  private util = inject(UtilitiesService);
  private coreConfig = inject<ICoreConfig>(CORE_CONFIG);
  private injector = inject(Injector);

  // Fallback config for params the saved widget omits. Kept in sync with the
  // builder panel defaults (getSwiper.ts) so a swiper renders the same whether
  // or not its settings panel was ever opened: navigation/autoplay are opt-in.
  private defaultConfig = {
    slidesPerView: 'auto',
    speed: 300,
    scrollbar: false,
    keyboard: true,
    mousewheel: false,
    navigation: false,
    autoplay: false,
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
  private initialized = false;

  private buildConfig(content: ISwiper): any {
    return Object.assign({}, this.defaultConfig, content?.params);
  }

  private applyConfig(swiperEle: any, config: any): void {
    // Swiper's render() runs only once — nav/pagination DOM is built at init.
    // Destroy and re-initialize so structural changes (enabling pagination,
    // changing effect, etc.) actually take effect.
    if (this.initialized && swiperEle.swiper) {
      swiperEle.swiper.destroy(true, true);
      swiperEle.rendered = false;
      swiperEle.passedParams = undefined;
      swiperEle.classList.remove('swiper-ready');
    }
    Object.assign(swiperEle, config);
    swiperEle.classList.add('swiper-ready');
    swiperEle.initialize();
    this.initialized = true;

    const content = this.content();
    if (content?.classes) {
      // classes may be a space-separated string; classList.add throws on a
      // token containing whitespace, which would abort the listeners below.
      swiperEle.classList.add(...content.classes.split(/\s+/).filter(Boolean));
    }
  }

  constructor() {
    afterNextRender(() => {
      const swiperEle = this.swiper()!.nativeElement;

      // Initial render.
      this.config = this.buildConfig(this.content());
      this.applyConfig(swiperEle, this.config);

      swiperEle.addEventListener('swiperslidechange', (event: any) => {
        const [swiper] = event.detail;
        this.slideChange.emit(swiper);
      });
      const navigationSub = this.navigationSub();
      if (navigationSub) {
        navigationSub.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(action => {
          if (action > 0) {
            swiperEle.swiper.slideNext();
          } else {
            swiperEle.swiper.slidePrev();
          }
        });
      }

      // Re-apply when content() signal changes after the initial render
      // (e.g. builder panel saves new params). Runs inside afterNextRender
      // so the DOM is guaranteed ready; the effect itself fires on signal changes.
      effect(
        () => {
          const newConfig = this.buildConfig(this.content());
          if (this.initialized) {
            this.applyConfig(swiperEle, newConfig);
          }
        },
        { injector: this.injector }
      );
    });

    effect(() => {
      const idx = this.index();
      const swiper = this.swiper();
      if (idx !== undefined && swiper?.nativeElement?.swiper) {
        swiper.nativeElement.swiper.slideTo(idx);
      }
    });
  }

  ngOnInit(): void {
    // Config is now built reactively in the constructor effect; nothing to do here.
  }

  async ngAfterViewInit(): Promise<void> {
    if (this.screenService.isPlatformBrowser()) {
      const source = this.coreConfig.librariesUseLocal ? 'local' : 'cdn';
      await this.util.loadStyle(getLibraryAsset(SWIPER_ASSETS, source, 'style'));
    }
  }

  onClick(slide: any): void {
    this.slideClick.emit(slide);
  }

  onpaginationRender(swiper: any): void {
    const content = this.content();
    if (content?.custom?.pagination?.bulletsStyle) {
      const {
        pagination: { bullets },
      } = swiper;
      content.custom.pagination.bulletsStyle.forEach((item, index) => {
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
