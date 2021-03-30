import { Component, OnInit } from '@angular/core';
import { NodeService } from '../../service/node.service';
import { isArray, keyBy, map } from 'lodash-es';
import { IShowcase2v1 } from '../../uiux/combs/ICombs';
@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.scss'],
})
export class CaseComponent implements OnInit {
  content: IShowcase2v1;
  relations: any;
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
      'fields[node--case]=title,created,medias,field_tags,drupal_internal__nid,path',
      'include=medias,medias.field_media_image,field_tags',
      'fields[file--file]=uri',
      'fields[taxonomy_term--industry]=name',
    ].join('&');

    this.nodeService.getNodes('case', params).subscribe((res) => {
      this.loading = false;
      this.relations = keyBy(res.included, 'id');
      this.content.elements = map(res.data, (item) => {
        const attr = item.attributes;
        const medias = item.relationships.medias.data;
        const mediaFirstId = medias[0].id;
        const imgFirstId = this.relations[mediaFirstId].relationships
          .field_media_image.data.id;
        return {
          body: attr.created,
          carousel: {
            params: {
              slidesPerView: 1,
              navigation: false,
              autoplay: {
                delay: 5000,
              },
              breakpoints: null,
            },
            elements: map(medias, (img) => {
              const imgFiledId = this.relations[img.id].relationships
                .field_media_image.data.id;
              return {
                type: 'img',
                src: this.relations[imgFiledId].attributes.uri.url,
                hostClasses: 'dispaly-block',
              };
            }),
          },
          overlay: [
            {
              label: '大图',
              href: this.relations[imgFirstId].attributes.uri.url,
            },
            {
              label: '更多',
              href: attr.path.alias
                ? attr.path.alias
                : `/node/${attr.drupal_internal__nid}`,
            },
          ],
          link: {
            label: attr.title,
            href: attr.path.alias
              ? attr.path.alias
              : `/node/${attr.drupal_internal__nid}`,
          },
        };
      });
    });
  }
}
