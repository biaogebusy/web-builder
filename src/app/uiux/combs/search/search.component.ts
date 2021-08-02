import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NodeService } from 'src/app/service/node.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Input() content: any;
  key = '';
  nodes: [];
  loading = false;
  constructor(
    private nodeService: NodeService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.router.queryParams.subscribe((query: any) => {
      console.log(query);
      if (query.keys) {
        this.key = query.keys;
        this.nodeSearch(this.key, 0);
      }
    });
  }

  onSearch(key: string): void {
    this.loading = true;
    this.key = key;
    this.nodeSearch(this.key, 0);
  }

  nodeSearch(key: string, page: number): void {
    this.nodeService.search(key, page).subscribe(
      (data) => {
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
