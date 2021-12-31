import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { NodeService } from '@core/service/node.service';
import { RouteService } from '@core/service/route.service';
import { ScreenService } from '@core/service/screen.service';
import { BaseComponent } from '@uiux/base/base.widget';
import { AppState } from '@core/mobx/AppState';
import { Subscription } from 'rxjs';

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

  subscription = new Subscription();
  constructor(
    public nodeService: NodeService,
    public routerService: RouteService,
    private appState: AppState,
    private screenService: ScreenService,
    private cd: ChangeDetectorRef
  ) {
    super(nodeService, routerService);
  }

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.getLists();
    }
  }

  getLists(): void {
    this.loading = true;
    const path = this.nodeService.apiUrlConfig.nodeGetPath;
    const sub$ = this.nodeService
      .getNodes(
        path,
        `${this.getParams(this.content, 'type')}`,
        `${this.getParams(this.content, 'options')}&sort=${this.getParams(
          this.content,
          'sort'
        )}&page[limit]=20`
      )
      .subscribe((res) => {
        this.updateList(res);
      });
    this.subscription.add(sub$);
  }

  onPageChange(link: string): void {
    this.screenService.gotoTop();
    const sub$ = this.nodeService.getNodeByLink(link).subscribe((res) => {
      this.updateList(res);
    });
    this.subscription.add(sub$);
  }

  updateList(res: any): void {
    this.lists = res.data.map((item: any) => {
      return {
        picture: {
          src: item.uid?.user_picture?.uri.url || this.appState.defaultLogo,
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
    this.subscription?.unsubscribe();
  }
}
