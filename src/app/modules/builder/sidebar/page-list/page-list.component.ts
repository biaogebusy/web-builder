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
import { FormControl, FormGroup } from '@angular/forms';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { SHARE_IMPORTS } from '@share/share-imports';
import { WIDGETS_IMPORTS } from '@uiux/widgets/widgets-imports';
import { FORM_IMPORTS } from '@uiux/combs/form/form-imports';
import { IPageMeta, IPageList } from '@core/interface/IBuilder';
import { BuilderService } from '@core/service/builder.service';
import { NodeService } from '@core/service/node.service';
import { TagsService } from '@core/service/tags.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState, IBuilderPendingPageLoad } from '@core/state/BuilderState';
import { USER } from '@core/token/token-providers';
import { PageItemComponent } from '../page-item/page-item.component';
import type { QueryParams } from '@core/util/http-params.util';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { BaseComponent } from '@uiux/base/base.widget';
import { TranslateService } from '@ngx-translate/core';
import { merge } from 'lodash-es';
import { environment } from 'src/environments/environment';

@Component({
  providers: [{ provide: MatPaginatorIntl, useClass: MatPaginatorIntlCro }],
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SHARE_IMPORTS, WIDGETS_IMPORTS, FORM_IMPORTS, MatPaginatorModule, PageItemComponent],
})
export class PageListComponent extends BaseComponent implements OnInit {
  private user = inject(USER);

  readonly content = input<any>();
  public form = new FormGroup({
    page: new FormControl(0),
  });
  public model: any = {
    noCache: true,
  };
  public langs = environment.langs;
  private builder = inject(BuilderState);
  private util = inject(UtilitiesService);
  private nodeService = inject(NodeService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private builderService = inject(BuilderService);
  private destroyRef = inject(DestroyRef);
  private tagService = inject(TagsService);
  private translate = inject(TranslateService);
  private pendingPageLoad?: IBuilderPendingPageLoad;

  private queryParams = signal<QueryParams | string>({ noCache: 1 });

  private listRes = this.nodeService.fetchResource(() => ({
    api: '/api/v2/node/landing-page',
    params: this.queryParams(),
  }));

  public loading = this.listRes.isLoading;

  private pageList = computed<IPageList | undefined>(() => {
    if (this.listRes.error()) {
      return {
        rows: [],
        pager: {
          current_page: null,
          total_pages: 0,
          total_items: 0,
        },
      } as any;
    }
    return this.listRes.value();
  });

  public lists = computed<IPageMeta[] | undefined>(() => this.pageList()?.rows);

  public pager = computed(() => {
    const res = this.pageList();
    return res ? this.handlePager(res.pager, res.rows.length) : undefined;
  });

  public fields: FormlyFieldConfig[] = [
    {
      type: 'tabs',
      fieldGroup: [
        {
          props: {
            label: this.translate.instant('BUILDER.PAGE_LIST.BASIC'),
          },
          fieldGroup: [
            {
              fieldGroupClassName: 'grid grid-cols-12 gap-1',
              fieldGroup: [
                {
                  key: 'title',
                  type: 'input',
                  className: 'col-span-12',
                  props: {
                    label: this.translate.instant('BUILDER.PAGE_LIST.SEARCH_TITLE'),
                    placeholder: this.translate.instant('BUILDER.PAGE_LIST.SEARCH_PLACEHOLDER'),
                  },
                  modelOptions: {
                    updateOn: 'submit',
                  },
                },
              ],
            },
          ],
        },
        {
          props: {
            label: this.translate.instant('BUILDER.PAGE_LIST.ADVANCED'),
          },
          fieldGroup: [
            {
              fieldGroupClassName: 'grid grid-cols-12 gap-1',
              fieldGroup: [
                {
                  key: 'group',
                  type: 'mat-select',
                  className: 'col-span-7',
                  props: {
                    api: '/api/v2/taxonomy/page_group',
                    nocache: true,
                    label: this.translate.instant('BUILDER.PAGE_LIST.CATEGORY'),
                    options: [
                      {
                        label: this.translate.instant('BUILDER.PAGE_LIST.ALL'),
                        value: null,
                      },
                    ],
                  },
                },
                {
                  key: 'langcode',
                  type: 'select',
                  className: 'col-span-5',
                  props: {
                    label: this.translate.instant('BUILDER.PAGE_LIST.LANGUAGE'),
                    options: [
                      {
                        label: this.translate.instant('BUILDER.PAGE_LIST.ALL'),
                        value: '',
                      },
                      ...(this.langs
                        ? this.langs.map(lang => {
                            return {
                              label: lang.label,
                              value: lang.langCode,
                            };
                          })
                        : []),
                    ],
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  constructor() {
    super();
    this.tagService.setTitle(this.translate.instant('BUILDER.PAGE_LIST.PAGE_TITLE'));
    effect(() => {
      const error: any = this.listRes.error();
      if (error?.status === 404) {
        this.util.openSnackbar(this.translate.instant('BUILDER.SETTINGS.CHECK_API'), 'ok');
      }
    });
  }

  ngOnInit(): void {
    this.pendingPageLoad = this.builder.consumePageLoad() ?? undefined;
    if (this.pendingPageLoad) {
      this.loadPage(this.pendingPageLoad);
      this.pendingPageLoad = undefined;
    }
    this.builder.updateSuccess$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(state => {
      if (state) {
        this.onReload();
      }
    });

    this.route.queryParams.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(query => {
      const { quickEdit, nid, langcode } = query;
      if (nid && (quickEdit || langcode)) {
        this.loadPage({
          nid,
          langcode,
        });
      } else {
        Object.keys(query).forEach(key => {
          this.form.get(key)?.patchValue(query[key], { onlySelf: true, emitEvent: false });
          this.form.get(key)?.markAsTouched();
        });

        const params = this.getApiParams({ ...query, noCache: 1 });
        this.queryParams.set(params);
      }
    });
  }

  onModelChange(value: any): void {
    this.form.get('page')?.patchValue(0, { onlySelf: true, emitEvent: false });
    const formValue = merge(value, this.form.getRawValue());
    this.router.navigate([], {
      queryParams: formValue,
    });
    this.queryParams.set(this.getApiParams({ ...formValue, noCache: 1 }));
  }

  loadPage(page: any): void {
    this.builder.loading.set(true);
    const { langcode, nid } = page;
    if (!nid) {
      this.builder.loading.set(false);
      this.util.openSnackbar(this.translate.instant('BUILDER.PAGE_LIST.CHECK_LANDING_VIEW'), 'ok');
      return;
    }
    this.clearPageLoadQueryParams();
    this.builderService.loadPage({ langcode, nid });
  }

  // This route owns the deep-link params, so it clears them once a row takes over
  onPageLoaded(): void {
    this.clearPageLoadQueryParams();
  }

  private clearPageLoadQueryParams(): void {
    const { nid, quickEdit } = this.route.snapshot.queryParams;
    if (!nid && !quickEdit) {
      return;
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        nid: null,
        quickEdit: null,
      },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }

  onPageChange(page: PageEvent): void {
    this.form.get('page')?.patchValue(page.pageIndex, { onlySelf: true, emitEvent: false });
    const value = merge(this.model, this.form.getRawValue());
    this.router.navigate([], {
      queryParams: value,
    });
    this.queryParams.set(this.getApiParams(value));
  }

  onReload(): void {
    this.form.reset();
    this.onModelChange({ title: '', time: +new Date() });
  }
}
