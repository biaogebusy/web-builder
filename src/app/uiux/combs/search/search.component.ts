import { Component, Input, OnInit, Query } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { omitBy, isEmpty } from 'lodash-es';
import { NodeService } from 'src/app/service/node.service';
import { RouteService } from 'src/app/service/route.service';
import { BaseComponent } from '../../base/base.widget';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent extends BaseComponent implements OnInit {
  @Input() content: any;
  searchEntry: any;
  page: number;
  pager: any;
  formValues: {};
  filterForm: any[];
  nodes: [];
  status: any;
  loading = false;
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
      const querys = omitBy(
        Object.assign(
          {
            page: this.page,
          },
          query
        ),
        isEmpty
      );
      if (this.content.sidebar) {
        this.filterForm = this.setFilterForm(querys, this.content.sidebar);
      }
      this.nodeSearch(querys);
    });
  }

  onSearch(option: any): void {
    this.nodeSearch(option);
  }

  onPageChange(page: any): void {
    this.page = page;
    this.nodeSearch({ page: this.page });
  }

  onSelectChange(options: any): void {
    this.page = options.page;
    this.formValues = options;
    this.nodeSearch(options);
  }

  nodeSearch(options: any): void {
    this.loading = true;
    this.searchEntry = omitBy(options, isEmpty);
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
  }
}
