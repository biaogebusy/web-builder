import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Inject,
  ChangeDetectionStrategy,
  inject,
  DestroyRef,
  signal,
} from '@angular/core';
import { ScreenService } from '../../service/screen.service';
import { ScreenState } from '../../state/screen/ScreenState';
import { DOCUMENT } from '@angular/common';
import { ContentState } from '@core/state/ContentState';
import { BRANDING, IS_BUILDER_MODE } from '@core/token/token-providers';
import { Observable, Subject } from 'rxjs';
import type { IBranding } from '@core/interface/branding/IBranding';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, AfterViewInit {
  sticky = signal(false);
  showBanner = signal(false);
  headerMode: any;
  @ViewChild('header', { read: ElementRef }) header: ElementRef;
  @ViewChild('menu', { read: ElementRef }) menu: ElementRef;
  destroy$: Subject<boolean> = new Subject<boolean>();
  private destoryRef = inject(DestroyRef);
  public screenService = inject(ScreenService);
  public screenState = inject(ScreenState);
  public contentState = inject(ContentState);
  constructor(
    @Inject(DOCUMENT) private doc: Document,
    @Inject(BRANDING) public branding$: Observable<IBranding>,
    @Inject(IS_BUILDER_MODE)
    public isBuilderMode$: Observable<boolean>
  ) {}

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
