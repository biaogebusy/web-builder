import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { omitBy } from 'lodash';
import { isEmpty } from 'lodash-es';
import { NodeService } from 'src/app/service/node.service';
import { RouteService } from 'src/app/service/route.service';
import { BaseComponent } from 'src/app/uiux/base/base.widget';

@Component({
  selector: 'app-tree-list',
  templateUrl: './tree-list.component.html',
  styleUrls: ['./tree-list.component.scss'],
})
export class TreeListComponent extends BaseComponent implements OnInit {
  @Input() content: any;
  nodes = [];
  loading = false;
  page: number;
  pager: any;
  hundredPoint: string;
  searchCategory: string;
  constructor(
    public nodeService: NodeService,
    private router: ActivatedRoute,
    public routerService: RouteService
  ) {
    super(nodeService, routerService);
  }

  ngOnInit(): void {
    this.router.queryParams.subscribe((query: any) => {
      this.page = query.page || 0;

      const queryOpt = omitBy(
        Object.assign(
          {
            page: this.page,
          },
          query
        ),
        isEmpty
      );
      this.nodeSearch();
    });
  }

  nodeSearch(): void {
    this.loading = true;
    const api = {
      hundred_point: this.hundredPoint,
      search_category: this.searchCategory,
    };
    const params = this.getApiParams(api);
    this.nodeService.search('content', params).subscribe(
      (data) => {
        this.updateList(data);
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  updateList(data: any): void {
    this.pager = data.pager;
    this.nodes = data.rows.map((item: any) => {
      return {
        link: {
          label: item.title,
          href: item.url,
          target: '_blank',
        },
        created: item.created,
        body: item.body,
        user: item.user,
        type: item.type || '',
      };
    });
    // this.updateUrl(formValues, options);
    // this.updateStatus();
  }

  onPageChange(event: any): void {
    console.log(event);
  }

  onSelectChange(event: any): void {
    this.searchCategory = event.option.value;
    this.nodeSearch();
  }

  onTreeActivate(event: any): void {
    this.hundredPoint = event.node.id;
    this.nodeSearch();
  }

  onDeactivate(event: any): void {
    this.hundredPoint = '';
    this.nodeSearch();
  }
}
