import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { IPageList } from '@core/interface/IBuilder';
import { IPager } from '@core/interface/widgets/IWidgets';
import { BuilderService } from '@core/service/builder.service';
import { NodeService } from '@core/service/node.service';
import { TagsService } from '@core/service/tags.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import { BaseComponent } from '@uiux/base/base.widget';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-builder-settings',
  templateUrl: './builder-settings.component.html',
  styleUrls: ['./builder-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuilderSettingsComponent extends BaseComponent implements OnInit {
  @Input() content: any;
  content$: Observable<any[]>;
  loading: boolean;
  pager: IPager;
  private builder = inject(BuilderState);
  private nodeService = inject(NodeService);
  private builderService = inject(BuilderService);
  private cd = inject(ChangeDetectorRef);
  private util = inject(UtilitiesService);
  private tagsService = inject(TagsService);

  constructor() {
    super();
    this.tagsService.setTitle('应用全局配置管理');
  }

  ngOnInit(): void {
    this.getNodeJson(`noCache=true`);
  }

  onAfterExpand(): void {
    this.builder.cancelFixedShowcase();
  }

  getNodeJson(params: string): void {
    this.loading = true;
    this.content$ = this.nodeService.fetch('/api/v2/node/core', params).pipe(
      catchError((error) => {
        if (error.status === 404) {
          this.util.openSnackbar('请检查API是否已配置！', 'ok');
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
      map((res) => {
        this.loading = false;
        this.cd.detectChanges();
        return this.getLists(res);
      }),
    );
  }

  getLists(res: IPageList): any[] {
    this.pager = this.handlerPager(res.pager, res.rows.length);
    this.cd.detectChanges();
    return res.rows;
  }

  onJson(page: any): void {
    this.builderService.loadNodeJson({
      langcode: page.langcode,
      nid: page.nid,
      uuid: page.uuid,
    });
  }

  onPageChange(page: PageEvent): void {
    this.getNodeJson(`page=${page.pageIndex}&nocache=true`);
  }

  reload(): void {
    this.getNodeJson('page=0&nocache=true');
  }
}
