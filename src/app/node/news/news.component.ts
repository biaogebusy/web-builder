import { Component, OnInit } from '@angular/core';
import { map } from 'lodash-es';
import { NodeService } from 'src/app/service/node.service';
import { TitleService } from 'src/app/service/title.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  loading = true;
  content: any;
  constructor(
    private titleService: TitleService,
    private nodeService: NodeService
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('News List');
    this.getNews();
  }
  getNews(): void {
    this.loading = true;
    const params = [
      'fields[node--news]=title,changed,body,media,field_tags,drupal_internal__nid,path,category',
      'include=category,field_tags,media,media.field_media_image',
      'fields[taxonomy_term--blog_category]=name',
      'fields[taxonomy_term--tags]=name',
      'fields[file--file]=uri',
      'jsonapi_include=1',
    ].join('&');
    this.nodeService.getNodes('news', params).subscribe((res) => {
      this.content = map(res.data, (item) => {
        const link = this.nodeService.getNodePath(item);
        return {
          title: {
            label: item.title,
            href: link,
          },
          spacer: 'none',
          feature: {
            fullIcon: 'fullscreen',
            openIcon: 'open_in_new',
            link: item.media.field_media_image.uri.url,
            ratios: 'media-16-9',
            img: {
              large: item.media.field_media_image.uri.url,
              normal: item.media.thumbnail.uri.url,
            },
          },
          date: item.changed,
          category: item.category.name,
          body: item.body.value,
          details: {
            label: 'Read More',
            href: link,
            style: 'style-v1',
            icon: 'open_in_new',
          },
        };
      });
      this.loading = false;
    });
  }
}
