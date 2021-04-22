import { Component, OnInit } from '@angular/core';
import { NodeService } from '../../service/node.service';
import { map } from 'lodash-es';
import { IShowcase2v1 } from '../../uiux/combs/ICombs';
@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.scss'],
})
export class CaseComponent implements OnInit {
  content: IShowcase2v1;
  loading = false;
  constructor(private nodeService: NodeService) {
    this.content = {
      title: 'Drupal 国内案例',
      subTitle: '欢迎分享 Drupal 优秀的数字创新体验',
      elements: [],
    };
  }

  ngOnInit(): void {
    this.getCases();
  }

  getCases(): void {
    this.loading = true;
    const params = [
      'fields[node--case]=title,body,created,medias,field_tags,drupal_internal__nid,path',
      'include=medias,medias.field_media_image,field_tags',
      'fields[file--file]=uri',
      'fields[taxonomy_term--industry]=name',
      'jsonapi_include=1',
    ].join('&');

    this.nodeService.getNodes('case', params).subscribe((res) => {
      this.loading = false;
      this.content.elements = map(res.data, (item: any) => {
        const link = this.nodeService.getNodePath(item);
        const date = `${new Date(item.created).getFullYear()}/${new Date(
          item.created
        ).getMonth()}/${new Date(item.created).getDate()}`;
        return {
          subTitle: date,
          avatar: {
            src: '/assets/images/showcase/console.png',
            alt: item.title,
          },
          body: item.body.value,
          carousel: {
            params: {
              slidesPerView: 1,
              navigation: false,
              autoplay: {
                delay: 5000,
              },
              breakpoints: null,
            },
            elements: map(item.medias, (img) => {
              return {
                type: 'feature-box',
                fullIcon: 'fullscreen',
                openIcon: 'open_in_new',
                link: '#',
                ratios: 'media-4-3',
                img: {
                  large: img.field_media_image.uri.url,
                  normal: img.field_media_image.uri.url,
                },
              };
            }),
          },
          tags: map(item.field_tags, (item) => {
            return { label: item.name };
          }),
          link: {
            label: item.title,
            href: link,
          },
        };
      });
    });
  }
}
