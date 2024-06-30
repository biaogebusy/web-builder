import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { IPageItem, IPageList } from '@core/interface/IBuilder';
import { IUser } from '@core/interface/IUser';
import { IPager } from '@core/interface/widgets/IWidgets';
import { BuilderService } from '@core/service/builder.service';
import { NodeService } from '@core/service/node.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import { USER } from '@core/token/token-providers';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { BaseComponent } from '@uiux/base/base.widget';
import { merge } from 'lodash-es';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageListComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  @Input() content: any;
  content$: Observable<IPageItem[]>;
  destroy$: Subject<boolean> = new Subject<boolean>();
  form = new FormGroup({
    page: new FormControl(0),
  });
  model: any = {};
  loading = false;
  pager: IPager;
  fields: FormlyFieldConfig[] = [
    {
      key: 'title',
      type: 'input',
      props: {
        label: '关键词',
        type: 'search',
      },
    },
  ];
  builder = inject(BuilderState);
  util = inject(UtilitiesService);
  nodeService = inject(NodeService);
  builderService = inject(BuilderService);
  constructor(
    private cd: ChangeDetectorRef,
    @Inject(USER) private user: IUser,
  ) {
    super();
  }

  ngOnInit(): void {
    this.fetchPage('noCache=1');
  }

  onModelChange(value: any): void {
    this.loading = true;
    this.form.get('page')?.patchValue(0, { onlySelf: true, emitEvent: false });
    const formValue = merge(value, this.form.getRawValue());
    const params = this.getApiParams({ ...formValue, noCache: 1 });
    this.fetchPage(params);
  }

  fetchPage(params: string): void {
    this.content$ = this.nodeService
      .fetch('/api/v2/node/landing-page', params)
      .pipe(
        takeUntil(this.destroy$),
        map((res) => {
          this.loading = false;
          return this.getLists(res);
        }),
      );
  }

  getLists(res: IPageList): any[] {
    this.pager = this.handlerPager(res.pager, res.rows.length);
    this.cd.detectChanges();
    return res.rows;
  }

  loadPage(page: IPageItem): void {
    this.util.openSnackbar(`正在加载${page.title}`, 'ok');
    this.builder.loading$.next(true);
    this.builderService.loadPage({ langcode: page.langcode, id: page.id });
  }
  deletePage(page: IPageItem): void {
    const { uuid } = page;
    const api = `/api/v1/node/landing_page`;
    this.nodeService
      .deleteEntity(api, uuid, this.user.csrf_token)
      .subscribe(() => {
        this.util.openSnackbar(`删除${page.title}成功`, 'ok');
      });
  }

  onPageChange(page: PageEvent): void {
    this.form
      .get('page')
      ?.patchValue(page.pageIndex, { onlySelf: true, emitEvent: false });
    const value = merge(this.model, this.form.getRawValue());
    const params = this.getApiParams(value);
    this.fetchPage(params);
  }

  onReload(): void {
    this.onModelChange({ title: '' });
  }

  ngOnDestroy(): void {
    if (this.destroy$.next) {
      this.destroy$.next(true);
      this.destroy$.unsubscribe();
    }
  }
}
