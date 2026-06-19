import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
  input,
} from '@angular/core';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ShareModule } from '@share/share.module';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { IPageList } from '@core/interface/IBuilder';
import { IPager } from '@core/interface/widgets/IWidgets';
import { BuilderService } from '@core/service/builder.service';
import { NodeService } from '@core/service/node.service';
import { TagsService } from '@core/service/tags.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import { getPageParams } from '@core/util/builder-page.util';
import type { QueryParams } from '@core/util/http-params.util';
import { BaseComponent } from '@uiux/base/base.widget';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-builder-settings',
  templateUrl: './builder-settings.component.html',
  styleUrls: ['./builder-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ShareModule, WidgetsModule, MatPaginatorModule],
})
export class BuilderSettingsComponent extends BaseComponent implements OnInit {
  readonly content = input<any>();
  public content$: Observable<any[]>;
  public loading: boolean;
  public pager: IPager;
  private builder = inject(BuilderState);
  private nodeService = inject(NodeService);
  private builderService = inject(BuilderService);
  private cd = inject(ChangeDetectorRef);
  private util = inject(UtilitiesService);
  private tagsService = inject(TagsService);
  private router = inject(Router);
  private translate = inject(TranslateService);

  constructor() {
    super();
    this.tagsService.setTitle(this.translate.instant('BUILDER.SETTINGS.PAGE_TITLE'));
  }

  ngOnInit(): void {
    this.getNodeJson({ noCache: true });
  }

  onAfterExpand(): void {
    this.builder.cancelFixedShowcase();
  }

  getNodeJson(params: QueryParams | string): void {
    this.loading = true;
    this.content$ = this.nodeService.fetch('/api/v2/node/core', params).pipe(
      catchError(error => {
        if (error.status === 404) {
          this.util.openSnackbar(this.translate.instant('BUILDER.SETTINGS.CHECK_API'), 'ok');
        }
        return of({
          rows: [],
          pager: {
            current_page: null,
            total_pages: 0,
            total_items: 0,
          },
        });
      }),
      map(res => {
        this.loading = false;
        this.cd.detectChanges();
        return this.getLists(res);
      })
    );
  }

  getLists(res: IPageList): any[] {
    this.pager = this.handlerPager(res.pager, res.rows.length);
    this.cd.detectChanges();
    return res.rows;
  }

  onJson(page: any): void {
    this.builder.loading.set(true);
    this.builderService.openPageSetting(
      { uuid: page.uuid, langcode: page.langcode },
      '/api/v1/node/json',
      getPageParams(['uid'])
    );
  }

  onPageChange(page: PageEvent): void {
    this.getNodeJson({ page: page.pageIndex, nocache: true });
  }

  reload(): void {
    this.getNodeJson({ page: 0, nocache: true });
  }

  addJSON(): void {
    this.router.navigate(['/builder/node-add/json']);
  }
}
