import { Component, Input, OnInit } from '@angular/core';
import { NodeService } from 'src/app/core/service/node.service';
import { RouteService } from 'src/app/core/service/route.service';
import { BaseComponent } from 'src/app/uiux/base/base.widget';

@Component({
  selector: 'app-dynamic-media-list',
  templateUrl: './dynamic-media-list.component.html',
  styleUrls: ['./dynamic-media-list.component.scss'],
})
export class DynamicMediaListComponent extends BaseComponent implements OnInit {
  @Input() content: any;
  list: any;
  links: any;
  loading = true;

  constructor(
    public nodeService: NodeService,
    public routerService: RouteService
  ) {
    super(nodeService, routerService);
  }

  ngOnInit(): void {
    this.getContent();
  }

  getContent(): void {
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
        this.updateList(res);
      });
  }

  updateList(res: any): void {
    this.list = res.data.map((item: any) => {
      const link = this.nodeService.getNodePath(item);
      return {
        title: {
          label: item.title,
          href: link,
        },
        spacer: 'none',
        showImage: this.content.showImage || true,
        feature: {
          fullIcon: 'fullscreen',
          openIcon: 'open_in_new',
          link,
          ratios: this.content.ratios || 'media-16-9',
          img: {
            classes: 'object-fit',
            src: item.media.thumbnail.uri.url,
            alt: item.title,
          },
        },
        date: item.changed,
        category: item.category.name,
        body: item.body.summary || item.body.value,
        details: {
          label: this.content.readMoreLabel || '查看更多',
          href: link,
          style: 'style-v1',
          icon: 'open_in_new',
        },
      };
    });
    this.links = res.links;
    this.loading = false;
  }

  loadContent(link: string): void {
    this.loading = true;
    this.nodeService.getNodeByLink(link).subscribe((res) => {
      this.updateList(res);
    });
  }
}
