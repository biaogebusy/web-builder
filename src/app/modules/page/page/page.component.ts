import {
  Component,
  inject,
  DestroyRef,
  AfterViewInit,
  DOCUMENT,
  afterEveryRender,
} from '@angular/core';
import { Observable } from 'rxjs';
import type { ICoreConfig, IPage } from '@core/interface/IAppConfig';
import { CORE_CONFIG, PAGE_CONTENT, USER } from '@core/token/token-providers';
import { ContentState } from '@core/state/ContentState';
import { pageContentFactory } from '@core/factory/factory';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ContentService } from '@core/service/content.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ScreenService } from '@core/service/screen.service';
import { ScreenState } from '@core/state/screen/ScreenState';
import { throttle } from 'lodash-es';
import { UtilitiesService } from '@core/service/utilities.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  providers: [
    {
      provide: PAGE_CONTENT,
      useFactory: pageContentFactory,
    },
  ],
  standalone: false,
})
export class PageComponent implements AfterViewInit {
  private doc = inject<Document>(DOCUMENT);
  public coreConfig = inject<ICoreConfig>(CORE_CONFIG);
  public pageContent$ = inject<Observable<IPage>>(PAGE_CONTENT);
  public mobileMenuOpened: boolean;
  public drawerLoading: boolean;
  public drawerContent: IPage;
  public opened: boolean;
  public user$ = inject(USER);
  private contentState = inject(ContentState);
  private destroyRef = inject(DestroyRef);
  private contentService = inject(ContentService);
  private screenService = inject(ScreenService);
  private router = inject(Router);
  private activateRouter = inject(ActivatedRoute);
  private screen = inject(ScreenState);
  private util = inject(UtilitiesService);

  constructor() {
    afterEveryRender({
      read: throttle(() => {
        this.util.intersectionObserver('[data-aos]', this.doc);
      }, 200),
    });
  }

  ngAfterViewInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.activateRouter.fragment.subscribe(fragment => {
        if (fragment) {
          this.screenService.scrollToAnchor(fragment);
        }
      });
      this.screen.drawer$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
        this.mobileMenuOpened = !this.mobileMenuOpened;
      });

      this.contentState.drawerOpened$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(state => {
        this.opened = state;
      });

      this.contentState.drawerLoading$
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(loading => {
          this.drawerLoading = loading;
        });

      this.contentState.drawerContent$
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((content: IPage) => {
          this.drawerContent = content;
        });
    }
  }

  onBackdrop(): void {
    this.contentState.drawerOpened$.next(false);
  }

  onDrawer(): void {
    if (this.opened) {
      this.doc.getElementsByTagName('html')[0].classList.add('drawer-disable-scroll');
      this.doc.getElementById('transparent-mode')?.classList.remove('transparent-mode');
    } else {
      this.doc.getElementsByTagName('html')[0].classList.remove('drawer-disable-scroll');
      this.doc.getElementById('transparent-mode')?.classList.add('transparent-mode');
    }
  }

  onEdit(nid: string): void {
    const url = this.doc.location.pathname;
    const { lang } = this.contentService.getUrlPath(url);
    this.router.navigate(['builder/page-list'], {
      queryParams: {
        nid,
        langcode: lang,
        quickEdit: true,
      },
    });
  }
}
