import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Inject,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { ScreenService } from '../../service/screen.service';
import { ScreenState } from '../../mobx/screen/ScreenState';
import { BrandingState } from '../../mobx/BrandingStare';
import { AppState } from '../../mobx/AppState';
import { DOCUMENT } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  sticky = false;

  @ViewChild('header', { read: ElementRef }) header: ElementRef;
  @ViewChild('menu', { read: ElementRef }) menu: ElementRef;

  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    public screenService: ScreenService,
    public screenState: ScreenState,
    public branding: BrandingState,
    public appState: AppState,
    public screen: ScreenState,
    private cd: ChangeDetectorRef,
    @Inject(DOCUMENT) private doc: Document
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.screenState.scroll$.pipe(takeUntil(this.destroy$)).subscribe(() => {
        this.sticky = this.screenService.isElementOutTopViewport(
          this.menu.nativeElement
        );
        this.listenSticky(this.sticky);
        if (this.appState?.pageConfig?.headerMode?.transparent) {
          this.windowScroll();
        }
        this.cd.detectChanges();
      });
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
    const style = this.appState.pageConfig.headerMode.style;
    if (
      this.doc.body.scrollTop > 50 ||
      this.doc.documentElement.scrollTop > 50
    ) {
      this.header.nativeElement.classList.add('header-sticky');
      this.header.nativeElement.classList.remove(style);
    } else {
      this.header.nativeElement.classList.remove('header-sticky');
      this.header.nativeElement.classList.add(style);
    }
  }

  showBanner(): boolean {
    const banner = this.branding.header.banner;
    if (!banner) {
      return false;
    }
    if (banner.breakpoint === 'all') {
      return true;
    } else {
      return this.screen.eq(banner.breakpoint || 'gt-sm');
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
