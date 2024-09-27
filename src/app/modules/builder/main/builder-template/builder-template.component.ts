import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BuilderService } from '@core/service/builder.service';
import { NodeService } from '@core/service/node.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import { templates } from '@modules/builder/data/template-for-builder';
import { DrupalJsonApiParams } from 'drupal-jsonapi-params';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

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
  private builderService = inject(BuilderService);

  ngOnInit(): void {
    if (environment.production) {
      this.getTemplates();
    } else {
      this.content$ = of(templates);
    }
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
          const pages = data.map((page: any) => {
            const {
              attributes: { title, drupal_internal__nid, meta_tags, langcode },
            } = page;

            return {
              title,
              description: meta_tags ? meta_tags.description : '',
              img: this.getCover(page.relationships.cover.data.id, included),
              langcode,
              nid: drupal_internal__nid,
            };
          });
          this.loading = false;
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

  onNewPage(page: any): void {
    this.dialog.closeAll();
    this.util.openSnackbar(`正在加入${page.title}模板`, 'ok');
    this.builder.loading$.next(true);
    this.builderService.loadPage({
      langcode: page.langcode,
      nid: page.nid,
      isTemplate: true,
    });
  }
}
