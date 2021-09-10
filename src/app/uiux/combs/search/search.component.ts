import { Component, Input, OnInit, Query } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { isArray, omitBy, isEmpty } from 'lodash-es';
import { NodeService } from 'src/app/service/node.service';
import { RouteService } from 'src/app/service/route.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Input() content: any;
  keys: string;
  page: number;
  pager: any;
  formParams: Params = {};
  formValues: {};
  filterForm: any[];
  nodes: [];
  status: any;
  loading = false;
  constructor(
    private nodeService: NodeService,
    private router: ActivatedRoute,
    private routerService: RouteService
  ) {}

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
        this.setFilterForm(queryOpt, this.content.sidebar);
      }
      this.nodeSearch(queryOpt);
    });
  }

  setFilterForm(query: any, controls: any[]): void {
    this.filterForm = controls.map((control) => {
      if (control.key in query) {
        control.value = query[control.key];
        return control;
      } else {
        return control;
      }
    });
  }

  getParamsState(options: any): any {
    return Object.assign({}, this.formValues, options);
  }

  onSearch(keys: string): void {
    this.keys = keys;
    this.nodeSearch({ keys: this.keys });
  }

  onPageChange(page: any): void {
    this.page = page;
    this.nodeSearch({ page: this.page });
  }

  onSelectChange(state: any): void {
    this.loading = true;
    this.keys = state.keys;
    this.page = state.page;
    this.formValues = state;
    const allState = this.getParamsState(state);
    const params = this.getApiParams(allState);
    this.formParams = this.getFormParams(allState);
    this.nodeService.searchNode(params).subscribe(
      (data) => {
        this.updateList(data, this.formParams);
      },
      (error) => {
        console.log(error);
        this.loading = false;
      }
    );
  }

  nodeSearch(options: any): void {
    this.loading = true;
    const state = this.getParamsState(options);
    const params = this.getApiParams(state);
    this.nodeService.search(params).subscribe(
      (data) => {
        const query: Params = this.getFormParams(state);
        this.updateList(data, query);
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  updateList(data: any, query: Params): void {
    this.routerService.updateQueryParams(query);
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
    this.loading = false;
    this.updateStatus();
  }

  updateStatus(): void {
    this.status = {
      key: this.keys,
      results: {
        count: this.nodes.length,
      },
    };
  }

  getApiParams(state: any): any {
    const params: string[] = [];
    if (state) {
      Object.keys(state).forEach((key) => {
        const val = state[key];
        if (val) {
          if (isArray(val)) {
            if (val.length > 0) {
              params.push(`${key}=${val.join('+')}`);
            } else {
              return;
            }
          } else {
            params.push(`${key}=${val}`);
          }
        }
      });
    }
    return params.join('&');
  }

  getFormParams(state: any): Params {
    const formParams: any = {};
    if (state) {
      Object.keys(state).forEach((key) => {
        const val = state[key];
        if (val) {
          if (isArray(val)) {
            if (val.length > 0) {
              formParams[key] = val.join('+');
            } else {
              delete formParams[key];
            }
          } else {
            formParams[key] = val;
          }
        } else {
          delete formParams[key];
        }
      });
    }
    return formParams;
  }
}
