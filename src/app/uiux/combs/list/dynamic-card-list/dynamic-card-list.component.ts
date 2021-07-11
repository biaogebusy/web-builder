import { Component, Input, OnInit } from '@angular/core';
import { NodeService } from 'src/app/service/node.service';

@Component({
  selector: 'app-dynamic-card-list',
  templateUrl: './dynamic-card-list.component.html',
  styleUrls: ['./dynamic-card-list.component.scss'],
})
export class DynamicCardListComponent implements OnInit {
  @Input() content: any;
  list: any;
  loading = true;
  p = 1;
  constructor(private nodeService: NodeService) {}

  ngOnInit(): void {
    this.getContent();
  }

  getContent(): void {
    this.loading = true;
    // TODO: the subTitle can be custom by json
    const params = [
      `include=${this.getParams('include')}`,
      `sort=${this.getParams('sort')}`,
      'jsonapi_include=1',
    ].join('&');
    this.nodeService
      .getNodes(`${this.getParams('type')}`, params)
      .subscribe((res) => {
        console.log(res);
        this.list = res.data.map((item: any) => {
          const link = this.nodeService.getNodePath(item);
          return {
            link: {
              label: item.title,
              href: link,
            },
            subTitle: item.subTitle,
            classes: 'card-no-shadow',
            feature: {
              fullIcon: 'fullscreen',
              openIcon: 'open_in_new',
              link,
              ratios: this.content.ratios || 'media-4-3',
              img: {
                large: item.media.field_media_image.uri.url,
                normal: item.media.thumbnail.uri.url,
              },
            },
            body: item.body.summary || item.body.value,
          };
        });
        console.log(this.list);
        this.loading = false;
      });
  }

  getParams(key: string): string {
    return this.content.params && this.content.params[key];
  }

  get row(): string {
    return `0 0 calc(100% / ${this.content.row || 3} - 4rem)`;
  }
}
