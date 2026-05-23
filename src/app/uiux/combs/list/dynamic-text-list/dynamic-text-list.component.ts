import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
  OnDestroy,
  inject,
  output,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NodeService } from '@core/service/node.service';
import { ScreenService } from '@core/service/screen.service';
import { BaseComponent } from '@uiux/base/base.widget';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CORE_CONFIG } from '@core/token/token-providers';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import type { IPaginationLinks } from '@core/interface/widgets/IPaginationLinks';
import type { IDynamicTextList } from '@core/interface/combs/IList';
import { ImgComponent } from '@uiux/widgets/img/img.component';
import { LinkComponent } from '@uiux/widgets/link/link.component';
import { PaginationLinksComponent } from '@uiux/widgets/pagination/pagination-links/pagination-links.component';

@Component({
  selector: 'app-dynamic-text-list',
  templateUrl: './dynamic-text-list.component.html',
  styleUrls: ['./dynamic-text-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DatePipe,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    NgxSkeletonLoaderModule,
    ImgComponent,
    LinkComponent,
    PaginationLinksComponent,
  ],
})
export class DynamicTextListComponent extends BaseComponent implements OnInit, OnDestroy {
  private coreConfig = inject<ICoreConfig>(CORE_CONFIG);

  @Input() content: IDynamicTextList;
  readonly pageChange = output<string>();

  lists: any[];
  links: IPaginationLinks;
  loading: boolean;

  destory$: Subject<boolean> = new Subject<boolean>();

  private cd = inject(ChangeDetectorRef);
  public nodeService = inject(NodeService);
  private screenService = inject(ScreenService);

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.getLists();
    }
  }

  getLists(): void {
    this.loading = true;
    const path = '/api/v1/node';
    this.nodeService
      .getNodes(
        path,
        `${this.getParams(this.content, 'type')}`,
        `${this.getParams(this.content, 'options')}&sort=${this.getParams(
          this.content,
          'sort'
        )}&page[limit]=20`
      )
      .pipe(takeUntil(this.destory$))
      .subscribe(res => {
        this.updateList(res);
      });
  }

  onPageChange(link: string): void {
    this.screenService.gotoTop();
    this.nodeService
      .getNodeByLink(link)
      .pipe(takeUntil(this.destory$))
      .subscribe(res => {
        this.updateList(res);
      });
  }

  updateList(res: any): void {
    this.lists = res.data.map((item: any) => {
      return {
        picture: {
          src: item.uid?.user_picture?.uri.url || this.coreConfig.defaultLogo,
          alt: item.uid.name,
        },
        name: item.uid.name,
        time: item.changed,
        link: {
          href: this.nodeService.getNodePath(item),
          label: item.title,
        },
        count: item.answer.comment_count,
      };
    });
    this.links = res.links;
    this.loading = false;
    this.cd.detectChanges();
  }

  ngOnDestroy(): void {
    this.destory$.next(true);
    this.destory$.unsubscribe();
  }
}
