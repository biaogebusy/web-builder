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
import type { IText } from '@core/interface/widgets/IText';
import { ScreenService } from '@core/service/screen.service';
import { CORE_CONFIG, DEBUG_ANIMATE } from '@core/token/token-providers';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import { ContentState } from '@core/state/ContentState';
import { BuilderState } from '@core/state/BuilderState';
import { Observable } from 'rxjs';
import { BaseComponent } from '@uiux/base/base.widget';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextComponent
  extends BaseComponent
  implements OnInit, AfterViewInit
{
  @Input() content: IText;
  @ViewChild('inner', { read: ElementRef }) inner: ElementRef;
  @ViewChild('title', { read: ElementRef }) title: ElementRef;
  @ViewChild('body', { read: ElementRef }) body: ElementRef;
  @ViewChild('list', { read: ElementRef }) list: ElementRef;
  @ViewChild('actions', { read: ElementRef }) actions: ElementRef;
  @ViewChild('bg', { read: ElementRef }) bg: ElementRef;
  disableAnimate = false;
  constructor(
    private screenService: ScreenService,
    private contentState: ContentState,
    private builder: BuilderState,
    private ele: ElementRef,
    @Inject(CORE_CONFIG) private coreConfig: ICoreConfig,
    @Inject(DEBUG_ANIMATE) private debugeAnimate$: Observable<boolean>
  ) {
    super();
  }

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.contentState.drawerOpened$.subscribe((state) => {
        this.disableAnimate = state;
      });
      this.builder.animateDisable$.subscribe((state) => {
        this.disableAnimate = state;
      });
    }
  }

  ngAfterViewInit(): void {
    if (
      this.screenService.isPlatformBrowser() &&
      this.coreConfig.animate &&
      !this.content?.animate?.disable &&
      !this.disableAnimate
    ) {
      this.debugeAnimate$.subscribe((state) => {
        this.showAnimate(state);
      });
    }
  }

  showAnimate(debug = false): void {
    const title: Element = this.title?.nativeElement;
    const body: Element = this.body?.nativeElement;
    const list: Element = this.list?.nativeElement;
    const actions: Element = this.actions?.nativeElement;
    const bg: Element = this.bg?.nativeElement;
    // https://greensock.com/st-demos/
    // https://greensock.com/docs/v3/Plugins/ScrollTrigger
    const tl = window.gsap.timeline({
      scrollTrigger: {
        trigger: this.ele.nativeElement,
        start: 'top 85%', // [触发元素开始的地方,视口开始的位置],
        end: 'bottom 30%',
        scroller: this.getScroller(),
        markers: debug,
        scrub: this.content?.animate?.scrub || false, // 滚动一次动画就对应更新，细粒度控制，适合根据鼠标滚动精细变化
        toggleActions: 'play none none none', // onEnter, onLeave, onEnterBack, and onLeaveBack
      },
    });

    if (bg) {
      const img = bg.querySelector('img');
      if (img) {
        tl.from(img, {
          autoAlpha: 0,
          scale: 1.5,
          duration: 2,
        });
      }
    }

    if (title) {
      tl.from(
        title,
        {
          y: 100,
          autoAlpha: 0,
          duration: 2,
          ease: 'expo.out',
        },
        '<0.5'
      );
    }

    if (body) {
      tl.from(
        body,
        {
          y: 100,
          autoAlpha: 0,
          duration: 1,
          ease: 'expo.out',
        },
        '<0.5'
      );
    }

    if (list) {
      tl.from(
        list,
        {
          y: 100,
          autoAlpha: 0,
          duration: 1,
          ease: 'expo.out',
        },
        '<0.5'
      );
    }

    if (actions) {
      tl.from(
        actions,
        {
          y: 100,
          autoAlpha: 0,
          duration: 1,
          ease: 'expo.out',
        },
        '<0.5'
      );
    }
  }
}
