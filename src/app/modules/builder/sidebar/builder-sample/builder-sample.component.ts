import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { BuilderService } from '@core/service/builder.service';
import { NodeService } from '@core/service/node.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import { DrupalJsonApiParams } from 'drupal-jsonapi-params';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-builder-sample',
  templateUrl: './builder-sample.component.html',
  styleUrls: ['./builder-sample.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuilderSampleComponent implements OnInit {
  samplePages$: Observable<any[]>;
  loading = true;
  constructor(
    private builder: BuilderState,
    private util: UtilitiesService,
    private noderService: NodeService,
    private builderService: BuilderService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    const apiParams = new DrupalJsonApiParams();
    apiParams
      .addPageLimit(20)
      .addSort('changed', 'DESC')
      .addFilter('status', '1')
      .addFilter('group.name', '示例页')
      .addCustomParam({ noCache: true });

    const params = apiParams.getQueryString();
    this.samplePages$ = this.noderService
      .fetch('/api/v1/node/landing_page', params)
      .pipe(
        map((res: any) => {
          const { data } = res;
          const pages = data.map((page: any) => {
            const {
              attributes: { title, drupal_internal__nid },
            } = page;
            return {
              title,
              nid: drupal_internal__nid,
            };
          });
          this.loading = false;
          this.cd.detectChanges();
          return pages;
        }),
      );
  }

  loadSample(item: any): void {
    this.util.openSnackbar(`正在加载${item.title}`, 'ok');
    this.builder.loading$.next(true);
    this.builderService.loadPage({ id: item.nid });
  }
}
