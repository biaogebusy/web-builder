import {
  Component,
  Inject,
  OnInit,
  AfterViewInit,
  NgZone,
} from '@angular/core';
import { Observable } from 'rxjs';
import type { IPage } from '@core/interface/IAppConfig';
import { PAGE_CONTENT } from '@core/token/token-providers';
import { ActivatedRoute } from '@angular/router';
import { ContentState } from '@core/state/ContentState';
import { pageContentFactory } from '@core/factory/factory';
import { ContentService } from '@core/service/content.service';
import { DOCUMENT } from '@angular/common';

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
export class BlockComponent implements OnInit, AfterViewInit {
  drawerLoading: boolean;
  drawerContent: IPage;
  opened: boolean;
  constructor(
    @Inject(DOCUMENT) private doc: Document,
    @Inject(PAGE_CONTENT) public pageContent$: Observable<IPage>,
    private contentState: ContentState,
    private zone: NgZone
  ) {}

  ngOnInit(): void {}

  onBackdrop(): void {
    this.opened = false;
  }

  ngAfterViewInit(): void {
    this.contentState.drawerOpened$.subscribe((opened) => {
      this.opened = opened;
    });

    this.contentState.drawerLoading$.subscribe((loading) => {
      this.drawerLoading = loading;
    });

    this.contentState.drawerContent$.subscribe((content: IPage) => {
      this.drawerContent = content;
    });
  }

  onDrawer(): void {
    this.zone.runOutsideAngular(() => {
      this.doc
        .getElementsByTagName('body')[0]
        .classList.toggle('drawer-disable-scroll');
      this.doc
        .getElementById('transparent-mode')
        ?.classList.toggle('transparent-mode');
    });
  }
}
