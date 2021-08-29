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
  links: any;
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
      `page[limit]=${this.getParams(this.content, 'limit') || 20}`,
    ].join('&');
    const path = this.nodeService.apiUrlConfig.nodeGetPath;
    this.nodeService
      .getNodes(path, `${this.getParams(this.content, 'type')}`, params)
      .subscribe((res) => {
        this.updateContent(res);
      });
  }
  onPageChange(link: string): void {
    this.nodeService.getNodeByLink(link).subscribe((res) => {
      this.updateContent(res);
    });
  }

  updateContent(res: any): void {
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
      const body = result(item, this.getValue(this.content, 'fields', 'body'));
      return {
        link: {
          label: title,
          href: link,
        },
        subTitle,
        classes: this.content.shadow ? '' : 'card-no-shadow',
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
    this.links = res.links;
    this.loading = false;
  }
}
