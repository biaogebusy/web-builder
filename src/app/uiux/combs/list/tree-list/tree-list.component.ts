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
  keys: string;
  page: number;
  pager: any;
  formValues: {};
  filterForm: any[];
  constructor(
    public nodeService: NodeService,
    private router: ActivatedRoute,
    public routerService: RouteService
  ) {
    super(nodeService, routerService);
  }

  ngOnInit(): void {
    this.router.queryParams.subscribe((query: any) => {
      this.keys = query.keys || '';
      this.page = query.page || 0;
      const queryOpt = omitBy(
        Object.assign(
          {
            keys: this.keys,
            page: this.page,
          },
          query
        ),
        isEmpty
      );
      if (this.content.sidebar) {
        this.filterForm = this.setFilterForm(queryOpt, this.content.sidebar);
      }
      this.nodeSearch(queryOpt);
    });
  }

  nodeSearch(options: any): void {
    this.loading = true;
    this.nodeSearchByParams('content', this.formValues, options).subscribe(
      (data) => {
        this.updateList(data, this.formValues, options);
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  updateList(data: any, formValues: any, options: any): void {
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
    this.updateUrl(formValues, options);
    // this.updateStatus();
  }

  onPageChange(event: any): void {
    console.log(event);
  }
}
