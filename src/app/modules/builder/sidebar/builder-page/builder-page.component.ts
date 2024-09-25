import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnInit,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { BuilderService } from '@core/service/builder.service';
import { NodeService } from '@core/service/node.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import { DrupalJsonApiParams } from 'drupal-jsonapi-params';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-builder-page',
  templateUrl: './builder-page.component.html',
  styleUrls: ['./builder-page.component.scss'],
})
export class BuilderPageComponent implements OnInit {
  pages$: Observable<any[]>;
  loading = true;
  name: string | null;
  private builder = inject(BuilderState);
  private cd = inject(ChangeDetectorRef);
  private util = inject(UtilitiesService);
  private destroyRef = inject(DestroyRef);
  private noderService = inject(NodeService);
  private activateRoute = inject(ActivatedRoute);
  private builderService = inject(BuilderService);

  ngOnInit(): void {
    this.activateRoute.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((paramsMap) => {
      this.name = paramsMap.get('name');
      this.loading = true;
      this.cd.detectChanges();
      const apiParams = new DrupalJsonApiParams();
      apiParams
        .addPageLimit(20)
        .addSort('changed', 'DESC')
        .addFilter('status', '1')
        .addFilter('group.name', this.name)
        .addCustomParam({ noCache: true });

      const params = apiParams.getQueryString();
      this.pages$ = this.noderService
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
            return [...pages];
          }),
          takeUntilDestroyed(this.destroyRef),
        );
    });
  }

  loadPage(item: any): void {
    this.util.openSnackbar(`正在加载${item.title}`, 'ok');
    this.builder.loading$.next(true);
    this.builderService.loadPage({ nid: item.nid });
  }
}
