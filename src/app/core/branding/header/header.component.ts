import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Inject,
  OnDestroy,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ScreenService } from '../../service/screen.service';
import { ScreenState } from '../../mobx/screen/ScreenState';
import { BrandingState } from '../../mobx/BrandingStare';
import { AppState } from '../../mobx/AppState';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  sticky = false;
  showBanner: boolean;

  @ViewChild('header', { read: ElementRef }) header: ElementRef;
  @ViewChild('menu', { read: ElementRef }) menu: ElementRef;

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
      this.screenState.scroll$.subscribe(() => {
        this.sticky = this.screenService.isElementOutTopViewport(
          this.menu.nativeElement
        );
        this.cd.detectChanges();
        this.listenSticky(this.sticky);
        if (this.appState?.pageConfig?.headerMode?.transparent) {
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

  initBanner(): void {
    const banner = this.branding.header.banner;
    if (!banner) {
      this.showBanner = false;
    } else {
      this.screenState.mqAlias$().subscribe((mq) => {
        this.showBanner = mq.includes(banner.breakpoint || 'gt-md');
        this.cd.detectChanges();
      });
    }
  }

  ngOnDestroy(): void {}
}
