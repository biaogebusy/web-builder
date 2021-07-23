import { Component, Input, OnInit } from '@angular/core';
import { result } from 'lodash-es';
import { NodeService } from 'src/app/service/node.service';
import { BaseComponent } from 'src/app/uiux/base/base.widget';

@Component({
  selector: 'app-dynamic-card-list',
  templateUrl: './dynamic-card-list.component.html',
  styleUrls: ['./dynamic-card-list.component.scss'],
})
export class DynamicCardListComponent extends BaseComponent implements OnInit {
  @Input() content: any;
  list: any;
  loading = true;
  p = 1;
  constructor(private nodeService: NodeService) {
    super();
  }

  ngOnInit(): void {
    this.getContent();
  }

  getContent(): void {
    this.loading = true;
    const params = [
      `include=${this.getParams(this.content, 'include')}`,
      `sort=${this.getParams(this.content, 'sort')}`,
      'jsonapi_include=1',
    ].join('&');
    this.nodeService
      .getNodes(`${this.getParams(this.content, 'type')}`, params)
      .subscribe((res) => {
        console.log(res);
        this.list = res.data.map((item: any) => {
          const link = this.nodeService.getNodePath(item);
          const subTitle = result(
            item,
            this.getValue(this.content, 'fields', 'subTitle')
          );
          const title = result(
            item,
            this.getValue(this.content, 'fields', 'title')
          );
          const body = result(
            item,
            this.getValue(this.content, 'fields', 'body')
          );
          return {
            link: {
              label: title,
              href: link,
            },
            subTitle,
            classes: 'card-no-shadow',
            feature: {
              fullIcon: 'fullscreen',
              openIcon: 'open_in_new',
              link,
              ratios: this.content.ratios || 'media-4-3',
              img: {
                classes: 'object-fit',
                src: item.media.thumbnail.uri.url,
                alt: title,
              },
            },
            body: body ? body : item.body.summary || item.body.value,
          };
        });
        console.log(this.list);
        this.loading = false;
      });
  }
}
