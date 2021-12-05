import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Inject,
} from '@angular/core';
import { ScreenService } from '../../service/screen.service';
import { ScreenState } from '../../../mobx/screen/ScreenState';
import { BrandingState } from '../../../mobx/BrandingStare';
import { AppState } from '../../../mobx/AppState';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  sticky = false;

  @ViewChild('header', { read: ElementRef }) header: ElementRef;
  @ViewChild('menu', { read: ElementRef }) menu: ElementRef;
  constructor(
    public screenService: ScreenService,
    public screenState: ScreenState,
    public branding: BrandingState,
    public appState: AppState,
    public screen: ScreenState,
    @Inject(DOCUMENT) private doc: Document
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.screenState.scroll$.subscribe(() => {
      this.sticky = this.screenService.isElementOutTopViewport(
        this.menu.nativeElement
      );
      this.listenSticky(this.sticky);
      if (this.appState?.pageConfig?.headerMode?.transparent) {
        this.windowScroll();
      }
    });
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
}
