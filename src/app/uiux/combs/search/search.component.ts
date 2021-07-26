import { Component, Input, OnInit } from '@angular/core';
import { NodeService } from 'src/app/service/node.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Input() content: any;
  nodes: [];
  loading = false;
  constructor(private nodeService: NodeService) {}

  ngOnInit(): void {
    this.content.sidebar = {
      filter: {
        label: '过滤',
        elements: [
          {
            label: '四分法',
            elements: [],
          },
        ],
      },
    };
  }

  onSearch(key: string): void {
    this.loading = true;
    this.nodeService.search(key).subscribe(
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
