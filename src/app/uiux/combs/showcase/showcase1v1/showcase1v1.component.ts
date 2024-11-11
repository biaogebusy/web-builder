import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { BaseComponent } from '@uiux/base/base.widget';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import { ScreenService } from '@core/service/screen.service';
import { CORE_CONFIG } from '@core/token/token-providers';
import type { IShowcase1v1 } from '@core/interface/combs/IShowcase';
import { ContentState } from '@core/state/ContentState';
import { BuilderState } from '@core/state/BuilderState';

@Component({
  selector: 'app-showcase-1v1',
  templateUrl: './showcase1v1.component.html',
  styleUrls: ['./showcase1v1.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Showcase1v1Component
  extends BaseComponent
  implements OnInit, AfterViewInit
{
  @Input() content: IShowcase1v1;
  @ViewChild('title', { read: ElementRef }) title: ElementRef;
  disableAnimate = false;

  constructor(
    private el: ElementRef,
    private screenService: ScreenService,
    private contentState: ContentState,
    private builder: BuilderState,
    @Inject(CORE_CONFIG) private coreConfig: ICoreConfig
  ) {
    super();
  }

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.contentState.drawerOpened$.subscribe(state => {
        this.disableAnimate = state;
      });
      this.builder.animateDisable$.subscribe(state => {
        this.disableAnimate = state;
      });
    }
  }

  ngAfterViewInit(): void {
    if (
      this.screenService.isPlatformBrowser() &&
      this.coreConfig.animate &&
      !this.disableAnimate
    ) {
      this.showAnimate();
    }
  }

  showAnimate(debug?: any): void {
    const title: Element = this.title?.nativeElement;
    const boxs = this.el.nativeElement.querySelectorAll('.box');
    const tl = window.gsap.timeline({
      scrollTrigger: {
        trigger: this.el.nativeElement,
        scroller: this.getScroller(),
        start: 'top 85%', // [触发元素开始的地方,视口开始的位置],
        end: 'bottom 30%',
        markers: debug,
        scrub: false, // 滚动一次动画就对应更新，细粒度控制，适合根据鼠标滚动精细变化
        toggleActions: 'play none none none', // onEnter, onLeave, onEnterBack, and onLeaveBack
      },
    });

    if (title) {
      tl.from(title, {
        y: 100,
        autoAlpha: 0,
      });
    }

    if (boxs?.length) {
      Array.from(boxs).forEach((box: any) => {
        tl.from(box, {
          y: 100,
          autoAlpha: 0,
        });
      });
    }
  }
}
