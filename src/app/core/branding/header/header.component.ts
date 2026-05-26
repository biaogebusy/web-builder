import { AsyncPipe } from '@angular/common';
import {
  Component,
  OnInit,
  ElementRef,
  AfterViewInit,
  inject,
  DestroyRef,
  signal,
  DOCUMENT,
  ChangeDetectionStrategy,
  viewChild
} from '@angular/core';
import { ScreenService } from '../../service/screen.service';
import { ScreenState } from '../../state/screen/ScreenState';

import { ContentState } from '@core/state/ContentState';
import { BRANDING } from '@core/token/token-providers';
import { Observable } from 'rxjs';
import type { IBranding } from '@core/interface/branding/IBranding';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HeaderBannerComponent } from './header-banner/header-banner.component';
import { HeaderTopComponent } from './header-top/header-top.component';
import { MenuComponent } from './menu/menu.component';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [AsyncPipe, HeaderBannerComponent, HeaderTopComponent, MenuComponent],
  host: {
    ngSkipHydration: 'true',
  },
})
export class HeaderComponent implements OnInit, AfterViewInit {
  private doc = inject<Document>(DOCUMENT);
  public branding$ = inject<Observable<IBranding>>(BRANDING);

  public sticky = signal(false);
  public showBanner = signal(false);
  public menuHeight = signal(0);
  readonly menuAnchor = viewChild('menuAnchor', { read: ElementRef });
  readonly sentinel = viewChild('sentinel', { read: ElementRef });
  private destoryRef = inject(DestroyRef);
  private screenService = inject(ScreenService);
  private screenState = inject(ScreenState);
  public contentState = inject(ContentState);
  private stickyObserver?: IntersectionObserver;

  ngOnInit(): void {
    this.contentState.pageConfig$.pipe(takeUntilDestroyed(this.destoryRef)).subscribe(config => {
      if (config?.headerMode?.transparent) {
        this.doc.getElementsByTagName('body')[0].classList.add('transparent-header');
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      setTimeout(() => {
        this.measureMenu();
        this.observeStickyState();
      });
      this.initBanner();
    }
  }

  private measureMenu(): void {
    const menuAnchor = this.menuAnchor();
    if (menuAnchor) {
      this.menuHeight.set(menuAnchor.nativeElement.offsetHeight);
    }
  }

  private observeStickyState(): void {
    const sentinel = this.sentinel();
    if (!sentinel) {
      return;
    }
    this.stickyObserver = new IntersectionObserver(
      ([entry]) => {
        const isSticky = !entry.isIntersecting && entry.boundingClientRect.top < 0;
        this.sticky.set(isSticky);
        this.screenState.stickyMenu$.next(isSticky);
      },
      { threshold: 0 }
    );
    this.stickyObserver.observe(sentinel.nativeElement);
    this.destoryRef.onDestroy(() => this.stickyObserver?.disconnect());
  }

  initBanner(): void {
    this.branding$.pipe(takeUntilDestroyed(this.destoryRef)).subscribe((branding: any) => {
      const banner = branding.header.banner;
      if (!banner) {
        this.showBanner.set(false);
      } else {
        this.screenState
          .mqAlias$()
          .pipe(takeUntilDestroyed(this.destoryRef))
          .subscribe(mq => {
            this.showBanner.set(mq.includes('md') || mq.includes('lg') || mq.includes('xl'));
          });
      }
    });
  }
}
