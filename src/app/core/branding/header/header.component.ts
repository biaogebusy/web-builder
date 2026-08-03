import {
  Component,
  OnInit,
  ElementRef,
  inject,
  Injector,
  computed,
  signal,
  effect,
  afterRenderEffect,
  DOCUMENT,
  ChangeDetectionStrategy,
  viewChild,
} from '@angular/core';
import type { EffectCleanupRegisterFn } from '@angular/core';
import { ScreenService } from '../../service/screen.service';
import { ScreenState } from '../../state/screen/ScreenState';

import { ContentState } from '@core/state/ContentState';
import { BRANDING } from '@core/token/token-providers';
import { AsyncPipe } from '@angular/common';
import { HeaderBannerComponent } from './header-banner/header-banner.component';
import { HeaderTopComponent } from './header-top/header-top.component';
import { MenuComponent } from './menu/menu.component';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [HeaderBannerComponent, HeaderTopComponent, MenuComponent, AsyncPipe],
})
export class HeaderComponent implements OnInit {
  private doc = inject<Document>(DOCUMENT);
  public branding$ = inject(BRANDING);

  public sticky = signal(false);
  public menuHeight = signal(0);
  public contentState = inject(ContentState);
  public pageHeaderMode = computed(() => {
    const config = this.contentState.pageConfig();
    return config ? config.headerMode : undefined;
  });
  readonly menuBar = viewChild('menuBar', { read: ElementRef });
  readonly sentinel = viewChild('sentinel', { read: ElementRef });
  private injector = inject(Injector);
  private screenService = inject(ScreenService);
  private screenState = inject(ScreenState);

  constructor() {
    afterRenderEffect(onCleanup => {
      if (!this.screenService.isPlatformBrowser()) {
        return;
      }

      const menuBar = this.menuBar();
      const sentinel = this.sentinel();
      if (!menuBar || !sentinel) {
        return;
      }

      this.observeMenuHeight(menuBar, onCleanup);
      this.observeStickyState(sentinel, onCleanup);
    });
  }

  ngOnInit(): void {
    effect(
      () => {
        const config = this.contentState.pageConfig();
        if (config && config.headerMode?.transparent) {
          this.doc.getElementsByTagName('body')[0].classList.add('transparent-header');
        }
      },
      { injector: this.injector }
    );
  }

  private observeMenuHeight(menuBar: ElementRef, onCleanup: EffectCleanupRegisterFn): void {
    const resizeObserver = new ResizeObserver(() => {
      this.menuHeight.set(menuBar.nativeElement.offsetHeight);
    });
    resizeObserver.observe(menuBar.nativeElement);
    onCleanup(() => resizeObserver.disconnect());
  }

  private observeStickyState(
    sentinel: ElementRef,
    onCleanup: EffectCleanupRegisterFn
  ): void {
    const stickyObserver = new IntersectionObserver(
      ([entry]) => {
        const isSticky = !entry.isIntersecting && entry.boundingClientRect.top < 0;
        this.sticky.set(isSticky);
        this.screenState.stickyMenu$.next(isSticky);
      },
      { threshold: 0 }
    );
    stickyObserver.observe(sentinel.nativeElement);
    onCleanup(() => stickyObserver.disconnect());
  }
}
