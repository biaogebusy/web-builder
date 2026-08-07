import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SHARE_IMPORTS } from '@share/share-imports';
import { WIDGETS_IMPORTS } from '@uiux/widgets/widgets-imports';
import { BuilderService } from '@core/service/builder.service';
import { NodeService } from '@core/service/node.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import { CORE_CONFIG } from '@core/token/token-providers';
import { DrupalJsonApiParams } from 'drupal-jsonapi-params';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-builder-template',
  templateUrl: './builder-template.component.html',
  styleUrls: ['./builder-template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SHARE_IMPORTS, WIDGETS_IMPORTS],
})
export class BuilderTemplateComponent {
  private builder = inject(BuilderState);
  private dialog = inject(MatDialog);
  private util = inject(UtilitiesService);
  private nodeService = inject(NodeService);
  private builderService = inject(BuilderService);
  private coreConfig = inject(CORE_CONFIG);
  private translate = inject(TranslateService);

  private readonly templateParams = new DrupalJsonApiParams()
    .addPageLimit(20)
    .addSort('changed', 'DESC')
    .addFilter('status', '1')
    .addFilter('group.name', '模板')
    .addInclude(['cover', 'cover.field_media_image'])
    .addCustomParam({ noCache: true })
    .getQueryString();

  private templateRes = this.nodeService.fetchResource(() => ({
    api: '/api/v1/node/landing_page',
    params: this.templateParams,
  }));

  loading = this.templateRes.isLoading;

  content = computed(() => {
    const res = this.templateRes.value();
    if (!res) {
      return [];
    }
    const { data, included } = res;
    return data.map((page: any) => {
      const {
        attributes: { title, drupal_internal__nid, meta_tags, langcode },
      } = page;

      return {
        title,
        description: meta_tags ? meta_tags.description : '',
        img: this.getCover(page.relationships.cover.data?.id, included),
        langcode,
        nid: drupal_internal__nid,
      };
    });
  });

  getCover(id: string, included: any[]): string {
    if (!id) {
      const { defaultThumb } = this.coreConfig;
      return defaultThumb;
    }
    const media = included.find(item => item.id === id);
    const mediaId = media.relationships.field_media_image.data.id;
    const img = included.find(item => item.id === mediaId);

    return img.attributes.uri.url;
  }

  onNewPage(page: any): void {
    this.dialog.closeAll();
    this.util.openSnackbar(
      this.translate.instant('BUILDER.TEMPLATE.LOADING_TEMPLATE', { title: page.title }),
      'ok'
    );
    this.builder.loading.set(true);
    this.builderService.loadPage({
      langcode: page.langcode,
      nid: page.nid,
      isTemplate: true,
    });
  }
}
