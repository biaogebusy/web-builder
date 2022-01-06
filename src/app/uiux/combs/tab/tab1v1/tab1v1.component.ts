import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BaseComponent } from '@uiux/base/base.widget';
import { NodeService } from '@core/service/node.service';
import { RouteService } from '@core/service/route.service';
import { isEmpty, omitBy } from 'lodash';
import { ScreenService } from '@core/service/screen.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-tab1v1',
  templateUrl: './tab1v1.component.html',
  styleUrls: ['./tab1v1.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Tab1v1Component
  extends BaseComponent
  implements OnInit, OnDestroy
{
  @Input() content: any;

  selectedIndex = 0;
  tabs: any[];
  page: number;
  pager: any;
  currentList: any[] = [];
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    public nodeService: NodeService,
    public routerService: RouteService,
    private router: ActivatedRoute,
    private screenService: ScreenService,
    private cd: ChangeDetectorRef
  ) {
    super(nodeService, routerService);
  }

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.router.queryParamMap.subscribe((query: Params) => {
        this.page = query.get('page') || 0;
        const querys = omitBy(
          Object.assign(
            {
              page: this.page,
            },
            {
              tab: query.get('tab') || 0,
            }
          ),
          isEmpty
        );
        this.initTab(querys);
      });
    }
  }

  initTab(query: Params): void {
    this.selectedIndex = Number(query.tab) || 0;
    this.tabs = this.content.tab.elements;
    if (this.selectedIndex < this.tabs.length) {
      const tabQuery = this.tabs[this.selectedIndex].query;
      const apiQuery = Object.assign({}, tabQuery, {
        page: query.page,
      });
      const type = this.getParams(this.content, 'type');
      this.nodeSearchByParams(type, {}, apiQuery)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res) => {
          this.pager = res.pager;
          this.currentList = res.rows.map((item: any) => {
            return {
              link: {
                href: item.url,
                label: item.title,
              },
              more: {
                href: item.url,
                label: '更多',
              },
              date: item.created,
              body: item.body,
            };
          });
          this.cd.detectChanges();
        });
    }
    this.cd.detectChanges();
  }

  onSelectChange(index: number): void {
    const values = {
      tab: index,
    };
    this.updateList(values);
  }

  onPageChange(page: number): void {
    const values = {
      tab: this.selectedIndex,
      page: page - 1,
    };
    this.updateList(values);
  }

  updateList(values: any): void {
    this.initTab(values);
    this.updateUrl(values);
    this.cd.detectChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
