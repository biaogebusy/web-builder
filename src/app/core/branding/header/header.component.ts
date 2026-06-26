import {
  Component,
  OnInit,
  ElementRef,
  AfterViewInit,
  inject,
  Injector,
  DestroyRef,
  computed,
  signal,
  effect,
  DOCUMENT,
  ChangeDetectionStrategy,
  viewChild,
} from '@angular/core';
import { ScreenService } from '../../service/screen.service';
import { ScreenState } from '../../state/screen/ScreenState';

import { ContentState } from '@core/state/ContentState';
import { BRANDING } from '@core/token/token-providers';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
  host: {
    ngSkipHydration: 'true',
  },
})
export class HeaderComponent implements OnInit, AfterViewInit {
  private doc = inject<Document>(DOCUMENT);
  public branding$ = inject(BRANDING);

  public sticky = signal(false);
  public showBanner = signal(false);
  public menuHeight = signal(0);
  public contentState = inject(ContentState);
  public pageHeaderMode = computed(() => {
    const config = this.contentState.pageConfig();
    return config ? config.headerMode : undefined;
  });
  readonly menuAnchor = viewChild('menuAnchor', { read: ElementRef });
  readonly sentinel = viewChild('sentinel', { read: ElementRef });
  private destoryRef = inject(DestroyRef);
  private injector = inject(Injector);
  private screenService = inject(ScreenService);
  private screenState = inject(ScreenState);
  private stickyObserver?: IntersectionObserver;

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
    this.branding$
      .pipe(
        switchMap(brandingValue => {
          const banner = brandingValue?.header?.banner;
          if (!banner) {
            return of(false);
          }
          return this.screenState
            .mqAlias$()
            .pipe(map(mq => mq.includes('md') || mq.includes('lg') || mq.includes('xl')));
        }),
        takeUntilDestroyed(this.destoryRef)
      )
      .subscribe(showBanner => {
        this.showBanner.set(showBanner);
      });
  }
}
