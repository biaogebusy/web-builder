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
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { IBtn } from '@core/interface/widgets/IBtn';
import type { IText } from '@core/interface/widgets/IText';
import { ScreenService } from '@core/service/screen.service';
import { CORE_CONFIG } from '@core/token/token-providers';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import { ContentState } from '@core/state/ContentState';
import { BuilderState } from '@core/state/BuilderState';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextComponent implements OnInit, AfterViewInit {
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
  }

  ngAfterViewInit(): void {
    if (
      this.screenService.isPlatformBrowser() &&
      this.coreConfig.animate &&
      !this.content?.animate?.disable &&
      !this.disableAnimate
    ) {
      this.showAnimate();
    }
  }

  showAnimate(debug?: any): void {
    const title: Element = this.title?.nativeElement;
    const body: Element = this.body?.nativeElement;
    const list: Element = this.list?.nativeElement;
    const actions: Element = this.actions?.nativeElement;
    const bg: Element = this.bg?.nativeElement;
    const tl = gsap.timeline({
      scrollTrigger: {
        id: 'text',
        trigger: this.inner?.nativeElement,
        start: 'top 85%', // [触发元素开始的地方,视口开始的位置],
        end: 'bottom 75px',
        markers: debug,
        scrub: this.content?.animate?.scrub || false, // 滚动一次动画就对应更新，细粒度控制，适合根据鼠标滚动精细变化
        toggleActions: 'play pause resume reset', // onEnter, onLeave, onEnterBack, and onLeaveBack
      },
    });

    if (bg) {
      const img = bg.querySelector('img');
      if (!img) {
        return;
      }
      tl.from(img, {
        autoAlpha: 0,
        scale: 1.5,
        duration: 2,
      });
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
    if (debug === false) {
      // tl.killAll();
    }
    if (debug === true) {
      tl.restart();
    }
  }

  getBtnLink(content: any): IBtn {
    return {
      mode: 'raised',
      color: 'primary',
      ...content,
    };
  }
}
