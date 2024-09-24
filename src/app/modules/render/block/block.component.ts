import {
  Component,
  Inject,
  OnInit,
  NgZone,
  Input,
  AfterContentInit,
  inject,
  DestroyRef,
} from '@angular/core';
import { Observable } from 'rxjs';
import type { ICoreConfig, IPage } from '@core/interface/IAppConfig';
import { CORE_CONFIG, PAGE_CONTENT, USER } from '@core/token/token-providers';
import { ContentState } from '@core/state/ContentState';
import { pageContentFactory } from '@core/factory/factory';
import { DOCUMENT } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ContentService } from '@core/service/content.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss'],
  host: { ngSkipHydration: 'true' },
  providers: [
    {
      provide: PAGE_CONTENT,
      useFactory: pageContentFactory,
    },
  ],
})
export class BlockComponent implements OnInit, AfterContentInit {
  @Input() isPreview = false;
  drawerLoading: boolean;
  drawerContent: IPage;
  opened: boolean;
  zone = inject(NgZone);
  user$ = inject(USER);
  contentState = inject(ContentState);
  private destroyRef = inject(DestroyRef);
  contentService = inject(ContentService);
  router = inject(Router);
  constructor(
    @Inject(DOCUMENT) private doc: Document,
    @Inject(PAGE_CONTENT) public pageContent$: Observable<IPage>,
    @Inject(CORE_CONFIG) public coreConfig: ICoreConfig,
  ) {}

  ngOnInit(): void {}

  onBackdrop(): void {
    this.contentState.drawerOpened$.next(false);
  }

  ngAfterContentInit(): void {
    this.contentState.drawerOpened$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((state) => {
        this.opened = state;
      });

    this.contentState.drawerLoading$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((loading) => {
        this.drawerLoading = loading;
      });

    this.contentState.drawerContent$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((content: IPage) => {
        this.drawerContent = content;
      });
  }

  onDrawer(): void {
    this.zone.runOutsideAngular(() => {
      if (this.opened) {
        this.doc
          .getElementsByTagName('html')[0]
          .classList.add('drawer-disable-scroll');
        this.doc
          .getElementById('transparent-mode')
          ?.classList.remove('transparent-mode');
      } else {
        this.doc
          .getElementsByTagName('html')[0]
          .classList.remove('drawer-disable-scroll');
        this.doc
          .getElementById('transparent-mode')
          ?.classList.add('transparent-mode');
      }
    });
  }

  onEdit(nid: string): void {
    const url = this.doc.location.pathname;
    const { lang } = this.contentService.getUrlPath(url);
    this.router.navigate(['builder/page-list'], {
      queryParams: {
        nid,
        langcode: lang,
      },
    });
  }
}
