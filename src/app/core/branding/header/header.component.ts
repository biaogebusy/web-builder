import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Inject,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ScreenService } from '../../service/screen.service';
import { ScreenState } from '../../state/screen/ScreenState';
import { DOCUMENT } from '@angular/common';
import { ContentState } from '@core/state/ContentState';
import { BRANDING } from '@core/token/token-providers';
import { Observable } from 'rxjs';
import type { IBranding } from '@core/interface/branding/IBranding';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, AfterViewInit {
  sticky = false;
  showBanner: boolean;
  headerMode: any;
  @ViewChild('header', { read: ElementRef }) header: ElementRef;
  @ViewChild('menu', { read: ElementRef }) menu: ElementRef;

  constructor(
    public screenService: ScreenService,
    public screenState: ScreenState,
    public screen: ScreenState,
    private cd: ChangeDetectorRef,
    public contentState: ContentState,
    @Inject(DOCUMENT) private doc: Document,
    @Inject(BRANDING) public branding$: Observable<IBranding>
  ) {}

  ngOnInit(): void {
    this.contentState.pageConfig$.subscribe((config) => {
      this.headerMode = config?.headerMode;
      if (this.headerMode?.transparent) {
        this.doc
          .getElementsByTagName('body')[0]
          .classList.add('transparent-header');
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.screenState.scroll$.subscribe(() => {
        if (this.menu) {
          this.sticky = this.screenService.isElementOutTopViewport(
            this.menu.nativeElement
          );
        }
        this.cd.detectChanges();
        this.listenSticky(this.sticky);
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
    this.branding$.subscribe((branding: any) => {
      const banner = branding.header.banner;
      if (!banner) {
        this.showBanner = false;
      } else {
        this.screenState.mqAlias$().subscribe((mq) => {
          this.showBanner = mq.includes(banner.breakpoint || 'gt-md');
          this.cd.detectChanges();
        });
      }
    });
  }
}
