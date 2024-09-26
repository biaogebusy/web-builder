import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IPage } from '@core/interface/IAppConfig';
import { ContentService } from '@core/service/content.service';
import { NodeService } from '@core/service/node.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import { templates } from '@modules/builder/data/template-for-builder';
import { DrupalJsonApiParams } from 'drupal-jsonapi-params';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-builder-template',
  templateUrl: './builder-template.component.html',
  styleUrls: ['./builder-template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuilderTemplateComponent implements OnInit {
  content$: Observable<any[]>;
  loading = true;
  private builder = inject(BuilderState);
  private dialog = inject(MatDialog);
  private util = inject(UtilitiesService);
  private nodeService = inject(NodeService);
  private contentService = inject(ContentService);

  ngOnInit(): void {
    this.getTemplates();
  }

  getTemplates(): void {
    this.loading = true;
    const apiParams = new DrupalJsonApiParams();
    apiParams
      .addPageLimit(20)
      .addSort('changed', 'DESC')
      .addFilter('status', '1')
      .addFilter('group.name', '模板')
      .addInclude(['cover', 'cover.field_media_image'])
      .addCustomParam({ noCache: true });

    const params = apiParams.getQueryString();
    this.content$ = this.nodeService
      .fetch(`/api/v1/node/landing_page`, params)
      .pipe(
        map((res) => {
          const { data, included } = res;
          const pages = data.map(async (page: any) => {
            console.log(page);
            const {
              attributes: { title, drupal_internal__nid },
            } = page;
            const body = await this.nodeService.fetch(
              `/api/v3/landingPage/json/${drupal_internal__nid}`,
              '',
            );

            return {
              title,
              img: this.getCover(page.relationships.cover.data.id, included),
              page: {
                title,
                current: true,
                time: new Date(),
                body,
              },
            };
          });
          this.loading = false;
          console.log(pages);
          return pages;
        }),
      );
  }

  getCover(id: string, included: any[]): string {
    const media = included.find((item) => item.id === id);
    const mediaId = media.relationships.field_media_image.data.id;
    const img = included.find((item) => item.id === mediaId);

    return img.attributes.uri.url;
  }

  onNewPage(page: IPage): void {
    this.builder.loadNewPage(page);
    this.dialog.closeAll();
    this.util.openSnackbar(`正在加入${page.title}模板`, 'ok');
  }
}
