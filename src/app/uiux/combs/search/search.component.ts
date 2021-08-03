import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
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

  onSelectChange(event: any): void {
    console.log(event);
  }

  nodeSearch(key: string, page: number): void {
    this.loading = true;
    this.nodeService.search(key, page).subscribe(
      (data) => {
        const query: Params = {
          keys: key,
          page,
        };
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
      },
      (error) => {
        this.loading = false;
      }
    );
  }
}
