import { MatPaginatorIntlCro } from '@core/service/paginator.service';
import { MatPaginatorIntl } from '@angular/material/paginator';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, FormControl } from '@angular/forms';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { SHARE_IMPORTS } from '@share/share-imports';
import { WIDGETS_IMPORTS } from '@uiux/widgets/widgets-imports';
import { FORM_IMPORTS } from '@uiux/combs/form/form-imports';
import { ICardList, IPageList, IPageMeta } from '@core/interface/IBuilder';
import { IUser } from '@core/interface/IUser';
import { NodeService } from '@core/service/node.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import { USER } from '@core/token/token-providers';
import type { QueryParams } from '@core/util/http-params.util';
import { BaseComponent } from '@uiux/base/base.widget';
import { TranslateService } from '@ngx-translate/core';
import { merge } from 'lodash-es';
import { environment } from 'src/environments/environment';

const emptyPageList: IPageList = {
  rows: [],
  pager: {
    current_page: null,
    total_pages: 0,
    total_items: 0,
  },
} as any;

@Component({
  providers: [{ provide: MatPaginatorIntl, useClass: MatPaginatorIntlCro }],
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SHARE_IMPORTS, WIDGETS_IMPORTS, FORM_IMPORTS, MatPaginatorModule],
})
export class CardListComponent extends BaseComponent implements OnInit {
  public user = inject(USER);

  readonly content = input.required<ICardList>();
  form = new FormGroup({
    page: new FormControl(0),
  });
  model: any = {
    noCache: true,
  };
  public langs = environment.langs;
  private builder = inject(BuilderState);
  private util = inject(UtilitiesService);
  private nodeService = inject(NodeService);
  private destroyRef = inject(DestroyRef);
  private translate = inject(TranslateService);

  private queryParams = signal<QueryParams | string>({ noCache: 1 });

  private listRes = this.nodeService.fetchResource(() => ({
    api: this.content().params.api,
    params: this.queryParams(),
  }));

  public loading = this.listRes.isLoading;

  private pageList = computed<IPageList | undefined>(() => {
    if (this.listRes.error()) {
      return emptyPageList;
    }
    return this.listRes.value();
  });

  public lists = computed<IPageMeta[] | undefined>(() => this.pageList()?.rows);

  public pager = computed(() => {
    const res = this.pageList();
    return res ? this.handlePager(res.pager, res.rows.length) : undefined;
  });

  constructor() {
    super();
    effect(() => {
      const error: any = this.listRes.error();
      if (error?.status === 404) {
        this.util.openSnackbar(this.translate.instant('BUILDER.SETTINGS.CHECK_API'), 'ok');
      }
    });
  }

  ngOnInit(): void {
    this.builder.updateSuccess$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(state => {
      if (state) {
        this.onReload();
      }
    });
  }

  onModelChange(value: any): void {
    this.form.get('page')?.patchValue(0, { onlySelf: true, emitEvent: false });
    const formValue = merge(value, this.form.getRawValue());
    this.queryParams.set(this.getApiParams({ ...formValue, noCache: 1 }));
  }

  onPageChange(page: PageEvent): void {
    this.form.get('page')?.patchValue(page.pageIndex, { onlySelf: true, emitEvent: false });
    const value = merge(this.model, this.form.getRawValue());
    this.queryParams.set(this.getApiParams(value));
  }

  onReload(): void {
    this.onModelChange({ title: '', time: +new Date() });
  }
}
