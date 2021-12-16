import { Component, Input, OnInit } from '@angular/core';
import { result } from 'lodash';
import { NodeService } from '@core/service/node.service';
import { RouteService } from '@core/service/route.service';
import { BaseComponent } from '@uiux/base/base.widget';
import { ScreenService } from '@core/service/screen.service';

@Component({
  selector: 'app-dynamic-card-list1v1',
  templateUrl: './dynamic-card-list1v1.component.html',
  styleUrls: ['./dynamic-card-list1v1.component.scss'],
})
export class DynamicCardList1v1Component
  extends BaseComponent
  implements OnInit
{
  @Input() content: any;

  page: number;
  pager: any;
  loading = false;
  nodes: any[];
  constructor(
    public nodeService: NodeService,
    public routerService: RouteService,
    private screenService: ScreenService
  ) {
    super(nodeService, routerService);
  }

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.nodeSearch({});
    }
  }

  nodeSearch(options: any): void {
    this.loading = true;
    this.nodeSearchByParams(
      this.getParams(this.content, 'type'),
      {},
      options
    ).subscribe(
      (data) => {
        this.updateList(data);
        this.loading = false;
      },
      (error) => {
        console.log(error);
        this.loading = false;
      }
    );
  }

  updateList(data: any): void {
    console.log(data);
    this.pager = data.pager;
    this.nodes = data.rows.map((item: any) => {
      return {
        link: {
          label: item.title,
          href: item.url,
        },
        user: item.user,
        time: item.date,
        feature: {
          fullIcon: 'fullscreen',
          openIcon: 'open_in_new',
          link: item.url,
          ratios: this.content.ratios || 'media-4-3',
          img: {
            classes: 'object-fit',
            src: item.image,
            title: item.title,
          },
        },
        moreLabel: '查看更多',
      };
    });
  }

  onPageChange(page: number): void {
    this.page = page - 1;
    this.nodeSearch({ page: this.page });
  }

  trackByFn(index: number, item: any): number {
    return index;
  }
}
