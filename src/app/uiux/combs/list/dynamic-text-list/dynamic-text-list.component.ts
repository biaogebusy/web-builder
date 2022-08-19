import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ChangeDetectorRef,
  OnDestroy,
  Inject,
} from '@angular/core';
import { NodeService } from '@core/service/node.service';
import { ScreenService } from '@core/service/screen.service';
import { BaseComponent } from '@uiux/base/base.widget';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CORE_CONFIG } from '@core/token/core.config';
import type { ICoreConfig } from '@core/mobx/IAppConfig';
import { UserState } from '@core/mobx/user/UserState';

@Component({
  selector: 'app-dynamic-text-list',
  templateUrl: './dynamic-text-list.component.html',
  styleUrls: ['./dynamic-text-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicTextListComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  @Input() content: any;
  @Output() pageChange: EventEmitter<string> = new EventEmitter();

  lists: any[];
  links: any;
  loading: boolean;

  destory$: Subject<boolean> = new Subject<boolean>();
  constructor(
    public nodeService: NodeService,
    private screenService: ScreenService,
    private cd: ChangeDetectorRef,
    public userState: UserState,
    @Inject(CORE_CONFIG) private coreConfig: ICoreConfig
  ) {
    super(userState);
  }

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.getLists();
    }
  }

  getLists(): void {
    this.loading = true;
    const path = this.nodeService.apiUrlConfig.nodeGetPath;
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
      .subscribe((res) => {
        this.updateList(res);
      });
  }

  onPageChange(link: string): void {
    this.screenService.gotoTop();
    this.nodeService
      .getNodeByLink(link)
      .pipe(takeUntil(this.destory$))
      .subscribe((res) => {
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

  trackByFn(index: number, item: any): number {
    return index;
  }

  ngOnDestroy(): void {
    this.destory$.next(true);
    this.destory$.unsubscribe();
  }
}
