import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  inject,
  DestroyRef,
  signal,
  DOCUMENT,
} from '@angular/core';
import { ScreenService } from '../../service/screen.service';
import { ScreenState } from '../../state/screen/ScreenState';

import { ContentState } from '@core/state/ContentState';
import { BRANDING } from '@core/token/token-providers';
import { Observable, Subject } from 'rxjs';
import type { IBranding } from '@core/interface/branding/IBranding';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false,
  host: {
    ngSkipHydration: 'true',
  },
})
export class HeaderComponent implements OnInit, AfterViewInit {
  private doc = inject<Document>(DOCUMENT);
  public branding$ = inject<Observable<IBranding>>(BRANDING);

  public sticky = signal(false);
  public showBanner = signal(false);
  private headerMode: any;
  private isBuilderMode = false;
  @ViewChild('header', { read: ElementRef }) header: ElementRef;
  @ViewChild('menu', { read: ElementRef }) menu: ElementRef;
  destroy$: Subject<boolean> = new Subject<boolean>();
  private destoryRef = inject(DestroyRef);
  private screenService = inject(ScreenService);
  private screenState = inject(ScreenState);
  public contentState = inject(ContentState);

  ngOnInit(): void {
    this.contentState.pageConfig$.pipe(takeUntilDestroyed(this.destoryRef)).subscribe(config => {
      this.headerMode = config?.headerMode;
      if (this.headerMode?.transparent) {
        this.doc.getElementsByTagName('body')[0].classList.add('transparent-header');
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.screenState.scroll$.pipe(takeUntilDestroyed(this.destoryRef)).subscribe(() => {
        if (this.isBuilderMode) {
          return;
        }
        if (this.menu) {
          this.sticky.set(this.screenService.isElementOutTopViewport(this.menu.nativeElement));
        }
        this.listenSticky(this.sticky());
        if (this.headerMode?.transparent) {
          this.windowScroll();
        }
      });
      this.initBanner();
    }
  }

  listenSticky(state: boolean): void {
    if (state) {
      this.screenState.stickyMenu$.next(true);
    } else {
      this.screenState.stickyMenu$.next(false);
    }
  }

  windowScroll(): void {
    const style = this.headerMode?.style;
    if (this.doc.body.scrollTop > 50 || this.doc.documentElement.scrollTop > 50) {
      this.header.nativeElement.classList.add('header-sticky');
      this.header.nativeElement.classList.remove(style);
    } else {
      this.header.nativeElement.classList.remove('header-sticky');
      this.header.nativeElement.classList.add(style);
    }
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
