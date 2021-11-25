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
  formState: any = {};
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
    const params = this.getApiParams(this.formState);
    this.nodeService.search('content', params).subscribe(
      (data) => {
        this.updateList(data);
        this.updateUrl(this.formState);
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
        actions: item.actions || [],
      };
    });
  }

  onPageChange(page: any): void {
    this.formState = Object.assign(this.formState, { page });
    this.nodeSearch();
  }

  onSelectChange(event: any): void {
    const option: any = {};
    option[event.key] = event.value;
    option.page = 0;
    this.formState = Object.assign(this.formState, option);
    this.nodeSearch();
  }

  onTreeChange(option: any): void {
    this.formState = Object.assign(this.formState, option);
    this.nodeSearch();
  }

  trackByFn(index: number, item: any): number {
    return index;
  }
}
