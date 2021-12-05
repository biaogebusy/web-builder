import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isEmpty, omitBy } from 'lodash-es';
import { NodeService } from 'src/app/core/service/node.service';
import { RouteService } from 'src/app/core/service/route.service';
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
      const initQuery: any = {};
      this.content.tree.forEach((item: any) => {
        initQuery[item.key] = item.value;
      });
      this.page = query.page || 0;
      // TODO: assign query
      const queryOpt = omitBy(
        Object.assign(
          {
            page: this.page,
          },
          query,
          initQuery
        ),
        isEmpty
      );
      this.nodeSearch(initQuery);
    });
  }

  nodeSearch(params: any): void {
    this.loading = true;
    this.nodeService.search('content', this.getApiParams(params)).subscribe(
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
    this.nodeSearch(this.formState);
  }

  onSelectChange(event: any): void {
    const option: any = {};
    option[event.key] = event.value;
    option.page = 0;
    this.formState = Object.assign(this.formState, option);
    this.nodeSearch(this.formState);
  }

  onTreeChange(option: any): void {
    this.formState = Object.assign(this.formState, option);
    this.nodeSearch(this.formState);
  }

  trackByFn(index: number, item: any): number {
    return index;
  }
}
