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
  nodes: [];
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
      this.nodeSearch(this.key, this.page);
    });
  }

  onSearch(key: string): void {
    this.key = key;
    this.nodeSearch(this.key, 0);
  }

  onPageChange(page: any): void {
    this.page = page;
    this.nodeSearch(this.key, this.page);
  }

  onSelectChange(controls: any): void {
    this.loading = true;
    console.log(controls);
    const params: string[] = [];
    Object.keys(controls).forEach((key) => {
      const val = controls[key];
      if (val) {
        if (isArray(val)) {
          if (val.length > 0) {
            params.push(`${key}=${val.join('+')}`);
            this.formParams[key] = val.join('+');
          } else {
            delete this.formParams[key];
          }
        } else {
          params.push(`${key}=${val}`);
          this.formParams[key] = val;
        }
      } else {
        delete this.formParams[key];
      }
    });
    params.push('loading=0');
    this.nodeService.searchNode(params.join('&')).subscribe(
      (data) => {
        this.updateList(data, this.formParams);
      },
      (error) => {
        console.log(error);
        this.loading = false;
      }
    );
  }

  nodeSearch(key: string, page: number): void {
    this.loading = true;
    const params = [`keys=${key}`, `page=${page}`, `loading=0`].join('&');
    this.nodeService.search(params).subscribe(
      (data) => {
        const query: Params = {
          keys: key,
          page,
        };
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
  }
}
