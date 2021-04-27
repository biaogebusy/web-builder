import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../service/title.service';
import { NodeService } from '../../service/node.service';
import { map } from 'lodash-es';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  content: any;
  loading = true;
  constructor(
    private titleService: TitleService,
    private nodeService: NodeService
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Blog list');
    this.getBlogs();
  }
  getBlogs(): void {
    this.loading = true;
    const params = [
      'fields[node--blog]=title,changed,body,media,field_tags,drupal_internal__nid,path,category',
      'include=category,field_tags,media,media.field_media_image',
      'fields[taxonomy_term--blog_category]=name',
      'fields[taxonomy_term--tags]=name',
      'fields[file--file]=uri',
      'jsonapi_include=1',
    ].join('&');
    this.nodeService.getNodes('blog', params).subscribe((res) => {
      this.content = map(res.data, (item) => {
        const link = this.nodeService.getNodePath(item);
        return {
          title: {
            label: item.title,
            href: link,
          },
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
