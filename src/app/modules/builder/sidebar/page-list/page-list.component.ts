import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnInit,
  inject,
  input
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup } from '@angular/forms';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { ShareModule } from '@share/share.module';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { FormModule } from '@uiux/combs/form/form.module';
import { IPage } from '@core/interface/IAppConfig';
import { IPageMeta, IPageList } from '@core/interface/IBuilder';
import { IUser } from '@core/interface/IUser';
import { IPager } from '@core/interface/widgets/IWidgets';
import { BuilderService } from '@core/service/builder.service';
import { NodeService } from '@core/service/node.service';
import { TagsService } from '@core/service/tags.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import { BUILDER_CURRENT_PAGE, USER } from '@core/token/token-providers';
import { formatToExtraData, getPageParams } from '@core/util/builder-page.util';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { BaseComponent } from '@uiux/base/base.widget';
import { TranslateService } from '@ngx-translate/core';
import { merge } from 'lodash-es';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ShareModule, WidgetsModule, FormModule, MatPaginatorModule],
})
export class PageListComponent extends BaseComponent implements OnInit {
  public currentPage = inject(BUILDER_CURRENT_PAGE);
  private user = inject(USER);

  readonly content = input<any>();
  public content$: Observable<IPageMeta[]>;
  public form = new FormGroup({
    page: new FormControl(0),
  });
  public model: any = {
    noCache: true,
  };
  public loading = false;
  public pager: IPager;
  public langs = environment.langs;
  private builder = inject(BuilderState);
  private cd = inject(ChangeDetectorRef);
  private util = inject(UtilitiesService);
  private nodeService = inject(NodeService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private builderService = inject(BuilderService);
  private destroyRef = inject(DestroyRef);
  private tagService = inject(TagsService);
  private translate = inject(TranslateService);

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
    super();this.tagService.setTitle(this.translate.instant('BUILDER.PAGE_LIST.PAGE_TITLE'));
  }

  ngOnInit(): void {
    this.fetchPage('noCache=1');    this.builder.updateSuccess$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(state => {
      if (state) {
        this.onReload();
      }
    });

    this.route.queryParams.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(query => {
      const { quickEdit, nid, langcode } = query;
      if (quickEdit || (nid && langcode)) {
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
        this.fetchPage(params);
      }
    });
  }

  onModelChange(value: any): void {
    this.form.get('page')?.patchValue(0, { onlySelf: true, emitEvent: false });
    const formValue = merge(value, this.form.getRawValue());
    this.router.navigate([], {
      queryParams: formValue,
    });
    const params = this.getApiParams({ ...formValue, noCache: 1 });
    this.fetchPage(params);
  }

  fetchPage(params: string): void {
    this.loading = true;
    this.content$ = this.nodeService.fetch('/api/v2/node/landing-page', params).pipe(
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
      }),
      takeUntilDestroyed(this.destroyRef)
    );
  }

  getLists(res: IPageList): any[] {
    this.pager = this.handlerPager(res.pager, res.rows.length);
    this.cd.detectChanges();
    return res.rows;
  }

  loadPage(page: any): void {
    this.builder.loading.set(true);
    const { langcode, nid } = page;
    if (!nid) {
      this.util.openSnackbar(this.translate.instant('BUILDER.PAGE_LIST.CHECK_LANDING_VIEW'), 'ok');
      return;
    }
    this.builderService.loadPage({ langcode, nid });
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
    const params = this.getApiParams(value);
    this.fetchPage(params);
  }

  createLangVersion(currentPage: IPageMeta, targetlang: string): void {
    this.builder.loading.set(true);
    this.nodeService
      .fetch(`/api/v3/landingPage/json/${currentPage.nid}`, 'noCache=1', targetlang)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((page: IPage) => {
        this.builder.loading.set(false);
        if (targetlang === page.langcode) {
          // 已有翻译
          this.util.openSnackbar(
            this.translate.instant('BUILDER.PAGE_LIST.TRANSLATION_EXISTS', { label: page.label }),
            'ok'
          );
          this.builder.loadNewPage(formatToExtraData(page));
        } else {
          // 复制一份，新建翻译
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
      });
  }

  onReload(): void {
    this.form.reset();
    this.onModelChange({ title: '', time: +new Date() });
  }
}
