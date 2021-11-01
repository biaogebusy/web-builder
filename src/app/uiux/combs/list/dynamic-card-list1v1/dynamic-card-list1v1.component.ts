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
    this.pager = data.pager;
    const rows: any = [
      {
        url: '#',
        title: 'How apps is changing the IT world',
        user: 'Biagebusy',
        time: '2021-10-30',
        img: 'assets/images/cases/porto1.jpg',
      },
      {
        url: '#',
        title: 'Design your apps in your own way',
        user: 'Biagebusy',
        time: '2021-10-30',
        img: 'assets/images/cases/porto1.jpg',
      },
      {
        url: '#',
        title: 'Smartest Applications for Business',
        user: 'Biagebusy',
        time: '2021-10-30',
        img: 'assets/images/cases/porto1.jpg',
      },
    ];
    this.nodes = rows.map((item: any) => {
      const link = item.url;
      const title = result(
        item,
        this.getValue(this.content, 'fields', 'title')
      );
      const user = result(item, this.getValue(this.content, 'fields', 'user'));
      const time = result(item, this.getValue(this.content, 'fields', 'time'));
      return {
        link: {
          label: title,
          href: link,
        },
        user,
        time,
        bg: {
          img: {
            classes: 'object-fit',
            src: item.img,
            alt: title,
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
