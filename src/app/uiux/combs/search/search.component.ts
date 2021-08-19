import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { isArray } from 'lodash-es';
import { NodeService } from 'src/app/service/node.service';
import { RouteService } from 'src/app/service/route.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Input() content: any;
  key = '';
  page = 0;
  pager: any;
  formParams: Params = {};
  formValues: any;
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
      console.log(query);
      this.key = query.keys || '';
      this.page = query.page || 0;
      this.nodeSearch();
    });
  }

  onSearch(key: string): void {
    this.key = key;
    this.nodeSearch();
  }

  onPageChange(page: any): void {
    this.page = page;
    this.nodeSearch();
  }

  onSelectChange(controls: any): void {
    this.loading = true;
    this.formValues = controls;
    if (!controls) {
      // clear
      this.key = '';
      this.page = 0;
    }
    const params = this.getApiParams(this.formValues);
    this.formParams = this.getFormParams(this.formValues);
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

  nodeSearch(): void {
    this.loading = true;
    // const params = [`keys=${key}`, `page=${page}`, `loading=0`].join('&');
    const params = this.getApiParams(this.formValues);
    this.nodeService.search(params).subscribe(
      (data) => {
        const query: Params = this.getFormParams(this.formValues);
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
      };
    });
    this.loading = false;
    this.updateStatus();
  }

  updateStatus(): void {
    this.status = {
      key: this.key,
      results: {
        count: this.nodes.length,
      },
    };
  }

  getApiParams(controls: any): any {
    const params: string[] = [];
    if (controls) {
      Object.keys(controls).forEach((key) => {
        const val = controls[key];
        if (val) {
          if (isArray(val) && val.length > 0) {
            params.push(`${key}=${val.join('+')}`);
          } else {
            params.push(`${key}=${val}`);
          }
        }
      });
    }
    if (this.key) {
      params.push(`keys=${this.key}`);
    }
    params.push(`page=${this.page}`);
    return params.join('&');
  }

  getFormParams(controls: any): Params {
    const formParams: any = {};
    if (controls) {
      Object.keys(controls).forEach((key) => {
        const val = controls[key];
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
    if (this.key) {
      formParams.keys = this.key;
    }
    if (this.page) {
      formParams.page = this.page;
    }
    return formParams;
  }
}
