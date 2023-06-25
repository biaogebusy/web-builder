import {
  Component,
  Inject,
  OnInit,
  AfterViewInit,
  NgZone,
  Input,
  OnDestroy,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import type { ICoreConfig, IPage } from '@core/interface/IAppConfig';
import { CORE_CONFIG, PAGE_CONTENT } from '@core/token/token-providers';
import { ActivatedRoute } from '@angular/router';
import { ContentState } from '@core/state/ContentState';
import { pageContentFactory } from '@core/factory/factory';
import { ContentService } from '@core/service/content.service';
import { DOCUMENT } from '@angular/common';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss'],
  providers: [
    {
      provide: PAGE_CONTENT,
      useFactory: pageContentFactory,
      deps: [ActivatedRoute, ContentService, ContentState],
    },
  ],
})
export class BlockComponent implements OnInit, AfterViewInit, OnDestroy {
  drawerLoading: boolean;
  drawerContent: IPage;
  opened: boolean;
  @Input() isPreview = false;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    @Inject(DOCUMENT) private doc: Document,
    @Inject(PAGE_CONTENT) public pageContent$: Observable<IPage>,
    @Inject(CORE_CONFIG) public coreConfig: ICoreConfig,
    private contentState: ContentState,
    private zone: NgZone
  ) {}

  ngOnInit(): void {}

  onBackdrop(): void {
    this.contentState.drawerOpened$.next(false);
  }

  ngAfterViewInit(): void {
    this.contentState.drawerOpened$
      .pipe(takeUntil(this.destroy$))
      .subscribe((state) => {
        this.opened = state;
      });

    this.contentState.drawerLoading$
      .pipe(takeUntil(this.destroy$))
      .subscribe((loading) => {
        this.drawerLoading = loading;
      });

    this.contentState.drawerContent$
      .pipe(takeUntil(this.destroy$))
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

  trackByFn(index: number): number {
    return index;
  }

  ngOnDestroy(): void {
    if (this.destroy$.next) {
      this.destroy$.next(true);
      this.destroy$.unsubscribe();
    }
  }
}
