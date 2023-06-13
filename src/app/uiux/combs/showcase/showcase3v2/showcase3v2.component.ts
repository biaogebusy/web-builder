import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import type { IShowcase3v2 } from '@core/interface/combs/IShowcase';
import type { IText } from '@core/interface/widgets/IText';
import { ScreenService } from '@core/service/screen.service';
import { CORE_CONFIG } from '@core/token/token-providers';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ContentState } from '@core/state/ContentState';
import { BuilderState } from '@core/state/BuilderState';

@Component({
  selector: 'app-showcase-3v2',
  templateUrl: './showcase3v2.component.html',
  styleUrls: ['./showcase3v2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Showcase3v2Component implements OnInit, AfterViewInit {
  @Input() content: IShowcase3v2;
  disableAnimate = false;
  text: IText;
  constructor(
    private el: ElementRef,
    private screenService: ScreenService,
    private contentState: ContentState,
    private builder: BuilderState,
    @Inject(CORE_CONFIG) private coreConfig: ICoreConfig
  ) {}

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      gsap.registerPlugin(ScrollTrigger);
      this.contentState.drawerOpened$.subscribe((state) => {
        this.disableAnimate = state;
      });
      this.builder.animateDisable$.subscribe((state) => {
        this.disableAnimate = state;
      });
    }
    this.text = {
      title: this.content.title,
      spacer: 'none',
      body: this.content.subTitle,
      classes: 'text-center',
    };
  }

  ngAfterViewInit(): void {
    if (
      this.screenService.isPlatformBrowser() &&
      this.coreConfig.animate &&
      !this.disableAnimate
    ) {
      this.animate();
    }
  }

  animate(): void {
    const items = this.el.nativeElement.querySelectorAll('.item');
    Array.from(items).forEach((item: any, index: number) => {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: 'top 80%', // [触发元素开始的地方,视口开始的位置],
          end: 'bottom 30%',
          markers: false,
          scrub: false, // 滚动一次动画就对应更新，细粒度控制，适合根据鼠标滚动精细变化
          toggleActions: 'play pause resume reset', // onEnter, onLeave, onEnterBack, and onLeaveBack
        },
      });
      const img = item.querySelector('img');
      tl.from(img, {
        autoAlpha: 0,
        x: this.isEven(index) ? 500 : -500,
        duration: 1,
      });
    });
  }

  isEven(n: number): boolean {
    return n % 2 == 0;
  }
}
