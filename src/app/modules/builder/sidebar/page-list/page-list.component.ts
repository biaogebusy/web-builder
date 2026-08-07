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
import { IPage } from '@core/interface/IAppConfig';
import { IPageMeta, IPageList } from '@core/interface/IBuilder';
import { IUser } from '@core/interface/IUser';
import { MatDialog } from '@angular/material/dialog';
import { IDialog } from '@core/interface/IDialog';
import { BuilderService } from '@core/service/builder.service';
import { NodeService } from '@core/service/node.service';
import { TagsService } from '@core/service/tags.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState, IBuilderPendingPageLoad } from '@core/state/BuilderState';
import { BUILDER_CURRENT_PAGE, USER } from '@core/token/token-providers';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { formatToExtraData, getPageParams } from '@core/util/builder-page.util';
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
  imports: [SHARE_IMPORTS, WIDGETS_IMPORTS, FORM_IMPORTS, MatPaginatorModule],
})
export class PageListComponent extends BaseComponent implements OnInit {
  public currentPage = inject(BUILDER_CURRENT_PAGE);
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
  private dialog = inject(MatDialog);
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

  copyPage(page: any): void {
    this.builderService.loadPage({
      langcode: page.langcode,
      nid: page.nid,
      isTemplate: true,
    });
  }

  updateByJSON(page: any): void {
    const { langcode, nid } = page;
    if (!nid) {
      this.util.openSnackbar(this.translate.instant('BUILDER.PAGE_LIST.CHECK_LANDING_VIEW'), 'ok');
      return;
    }
    this.builderService.loadPageJSON({ langcode, nid });
  }

  updatePageSetting(page: IPageMeta): void {
    this.builder.loading.set(true);

    this.builderService.openPageSetting(
      page,
      '/api/v1/node/landing_page',
      getPageParams(['uid', 'group', 'cover', 'cover.field_media_image'])
    );
  }

  onPageChange(page: PageEvent): void {
    this.form.get('page')?.patchValue(page.pageIndex, { onlySelf: true, emitEvent: false });
    const value = merge(this.model, this.form.getRawValue());
    this.router.navigate([], {
      queryParams: value,
    });
    this.queryParams.set(this.getApiParams(value));
  }

  createLangVersion(currentPage: IPageMeta, targetlang: string): void {
    const lang = this.langs?.find(l => l.langCode === targetlang);
    const config: IDialog = {
      title: this.translate.instant('BUILDER.PAGE_LIST.CREATE_LANG_TITLE'),
      noLabel: this.translate.instant('BUILDER.COMMON.CANCEL'),
      yesLabel: this.translate.instant('BUILDER.PAGE_LIST.CREATE_LANG_YES'),
      inputData: {
        content: {
          type: 'text',
          fullWidth: true,
          body: this.translate.instant('BUILDER.PAGE_LIST.CREATE_LANG_CONFIRM', {
            title: currentPage.title,
            lang: lang?.label || targetlang,
          }),
        },
      },
    };
    this.dialog
      .open(DialogComponent, { width: '340px', data: config })
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(result => {
        if (!result) return;
        this.builder.loading.set(true);
        this.nodeService
          .fetch(`/api/v3/landingPage/json/${currentPage.nid}`, { noCache: 1 }, targetlang)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: (page: IPage) => {
              this.builder.loading.set(false);
              if (targetlang === page.langcode) {
                this.util.openSnackbar(
                  this.translate.instant('BUILDER.PAGE_LIST.TRANSLATION_EXISTS', {
                    label: page.label,
                  }),
                  'ok'
                );
                this.builder.loadNewPage(formatToExtraData(page));
              } else {
                this.util.openSnackbar(
                  this.translate.instant('BUILDER.PAGE_LIST.LOADING_TRANSLATION', {
                    title: currentPage.title,
                    lang: targetlang,
                  }),
                  'ok'
                );
                this.builder.loadNewPage(
                  formatToExtraData({
                    langcode: currentPage.langcode,
                    ...page,
                    translation: true,
                    target: targetlang,
                  })
                );
              }
            },
            error: () => {
              this.builder.loading.set(false);
              this.util.openSnackbar(
                this.translate.instant('BUILDER.PAGE_LIST.LOAD_TRANSLATION_FAIL', {
                  title: currentPage.title,
                }),
                'ok'
              );
            },
          });
      });
  }

  deletePage(page: IPageMeta): void {
    const config: IDialog = {
      title: this.translate.instant('BUILDER.PAGE_LIST.DELETE_TITLE'),
      noLabel: this.translate.instant('BUILDER.COMMON.CANCEL'),
      yesLabel: this.translate.instant('BUILDER.PAGE_SETTING.DELETE'),
      inputData: {
        content: {
          type: 'text',
          fullWidth: true,
          body: this.translate.instant('BUILDER.PAGE_LIST.DELETE_CONFIRM', { title: page.title }),
        },
      },
    };
    this.dialog
      .open(DialogComponent, { width: '340px', data: config })
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(result => {
        if (!result) return;
        this.builder.loading.set(true);
        this.nodeService
          .deleteEntity('/api/v1/node/landing_page', page.uuid)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: () => {
              this.builder.loading.set(false);
              this.util.openSnackbar(
                this.translate.instant('BUILDER.PAGE_SETTING.DELETE_SUCCESS', { title: page.title }),
                'ok'
              );
              this.onReload();
            },
            error: err => {
              this.builder.loading.set(false);
              if (err.status === 403) {
                this.util.openSnackbar(this.translate.instant('BUILDER.PAGE_SETTING.NO_PERMISSION'));
              } else {
                this.util.openSnackbar(
                  this.translate.instant('BUILDER.PAGE_SETTING.DELETE_FAIL', { title: page.title })
                );
              }
            },
          });
      });
  }

  onReload(): void {
    this.form.reset();
    this.onModelChange({ title: '', time: +new Date() });
  }

  getLangLabel(code: string): string {
    return this.langs?.find(l => l.langCode === code)?.label ?? code;
  }
}
