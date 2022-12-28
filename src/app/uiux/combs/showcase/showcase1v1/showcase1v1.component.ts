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
import { BaseComponent } from '@uiux/base/base.widget';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import { ScreenService } from '@core/service/screen.service';
import { CORE_CONFIG } from '@core/token/token-providers';

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
  @Input() content: any;
  @ViewChild('title', { read: ElementRef }) title: ElementRef;
  constructor(
    private el: ElementRef,
    private screenService: ScreenService,
    @Inject(CORE_CONFIG) private coreConfig: ICoreConfig
  ) {
    super();
  }

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      gsap.registerPlugin(ScrollTrigger);
    }
  }

  ngAfterViewInit(): void {
    if (this.screenService.isPlatformBrowser() && this.coreConfig.animate) {
      this.animate();
    }
  }

  animate(): void {
    const title: Element = this.title?.nativeElement;
    const boxs = this.el.nativeElement.querySelectorAll('.box');
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: this.el.nativeElement,
        start: 'top 85%', // [触发元素开始的地方,视口开始的位置],
        end: 'bottom 30%',
        markers: false,
        scrub: false, // 滚动一次动画就对应更新，细粒度控制，适合根据鼠标滚动精细变化
        toggleActions: 'play pause resume reset', // onEnter, onLeave, onEnterBack, and onLeaveBack
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
