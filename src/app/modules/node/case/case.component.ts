import { Component, OnInit } from '@angular/core';
import { NodeService } from '@core/service/node.service';
import { map } from 'lodash-es';
import { IShowcase2v1 } from '@uiux/combs/ICombs';
import { ScreenService } from '@core/service/screen.service';
@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.scss'],
})
export class CaseComponent implements OnInit {
  content: IShowcase2v1;
  loading = false;
  constructor(
    private nodeService: NodeService,
    private screenService: ScreenService
  ) {
    this.content = {
      text: {
        spacer: 'none',
        title: {
          label: '国内 Drupal 优秀网站案例',
          style: 'style-v1',
          classes: 'mat-display-0',
        },
        body: '<p class="text-center">欢迎分享 Drupal 优秀的数字创新体验</p>',
      },
      elements: [],
    };
  }

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.getCases();
    }
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

    const path = this.nodeService.apiUrlConfig.nodeGetPath;

    this.nodeService.getNodes(path, 'case', params).subscribe((res) => {
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
                link,
                ratios: 'media-140',
                img: {
                  classes: 'object-fit',
                  src: img.field_media_image.uri.url,
                  alt: item.title,
                },
              };
            }),
          },
          tags: map(item.field_tags, (tag) => {
            return { label: tag.name };
          }),
          link: {
            label: item.title,
            href: link,
          },
        };
      });
      this.loading = false;
    });
  }
}
