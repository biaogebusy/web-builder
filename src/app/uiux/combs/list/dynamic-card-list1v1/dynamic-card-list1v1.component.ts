import { Component, Input, OnInit } from '@angular/core';
import { result } from 'lodash';
import { NodeService } from 'src/app/service/node.service';
import { RouteService } from 'src/app/service/route.service';
import { BaseComponent } from 'src/app/uiux/base/base.widget';

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
    public routerService: RouteService
  ) {
    super(nodeService, routerService);
  }

  ngOnInit(): void {
    this.nodeSearch({});
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
      const link = item.url;
      const time = result(item, this.getValue(this.content, 'fields', 'time'));
      return {
        link: {
          label: item.title,
          href: item.link,
        },
        user: item.user,
        time: item.date,
        bg: {
          img: {
            classes: 'object-fit',
            src: item.image,
            alt: item.title,
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
}
