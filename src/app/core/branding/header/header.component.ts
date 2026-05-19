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
import { Observable } from 'rxjs';
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
  public menuHeight = signal(0);
  @ViewChild('menuAnchor', { read: ElementRef }) menuAnchor: ElementRef;
  @ViewChild('sentinel', { read: ElementRef }) sentinel: ElementRef;
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
    if (this.menuAnchor) {
      this.menuHeight.set(this.menuAnchor.nativeElement.offsetHeight);
    }
  }

  private observeStickyState(): void {
    if (!this.sentinel) {
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
    this.stickyObserver.observe(this.sentinel.nativeElement);
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
