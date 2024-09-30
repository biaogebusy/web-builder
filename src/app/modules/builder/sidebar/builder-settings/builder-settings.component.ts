import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import type { IBranding } from '@core/interface/branding/IBranding';
import { BuilderService } from '@core/service/builder.service';
import { NodeService } from '@core/service/node.service';
import { BuilderState } from '@core/state/BuilderState';
import { DrupalJsonApiParams } from 'drupal-jsonapi-params';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-builder-settings',
  templateUrl: './builder-settings.component.html',
  styleUrls: ['./builder-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuilderSettingsComponent implements OnInit {
  content$: Observable<any>;
  loading: boolean;
  branding: IBranding;
  private builder = inject(BuilderState);
  private destroyRef = inject(DestroyRef);
  private nodeService = inject(NodeService);
  private builderService = inject(BuilderService);
  constructor() {}

  ngOnInit(): void {
    this.getNodeJson();
  }

  onAfterExpand(): void {
    this.builder.cancelFixedShowcase();
  }

  getNodeJson(): void {
    this.loading = true;
    const apiParams = new DrupalJsonApiParams();
    apiParams
      .addPageLimit(20)
      .addSort('changed', 'DESC')
      .addFilter('status', '1')
      .addCustomParam({ noCache: true });

    const params = apiParams.getQueryString();
    this.content$ = this.nodeService.fetch('/api/v1/node/json', params).pipe(
      map((res) => {
        const { data } = res;
        return data.map((item: any) => {
          const {
            id,
            attributes: { title, drupal_internal__nid, langcode },
          } = item;
          this.loading = false;
          return {
            title,
            nid: drupal_internal__nid,
            langcode,
            uuid: id,
          };
        });
      }),
      takeUntilDestroyed(this.destroyRef),
    );
  }

  onJson(page: any): void {
    this.builderService.loadNodeJson({
      langcode: page.langcode,
      nid: page.nid,
      uuid: page.uuid,
    });
  }
}
