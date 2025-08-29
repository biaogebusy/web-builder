import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
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
import { FormlyFieldConfig } from '@ngx-formly/core';
import { BaseComponent } from '@uiux/base/base.widget';
import { merge } from 'lodash-es';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class PageListComponent extends BaseComponent implements OnInit {
  private currentPage$ = inject<Observable<IPage>>(BUILDER_CURRENT_PAGE);
  private user$ = inject<Observable<IUser>>(USER);

  @Input() content: any;
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
  public currentPage?: IPage;
  private builder = inject(BuilderState);
  private cd = inject(ChangeDetectorRef);
  private util = inject(UtilitiesService);
  private nodeService = inject(NodeService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private builderService = inject(BuilderService);
  private destroyRef = inject(DestroyRef);
  private tagService = inject(TagsService);
  public user: IUser;

  public fields: FormlyFieldConfig[] = [
    {
      type: 'tabs',
      fieldGroup: [
        {
          props: {
            label: '基础',
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
                    label: '搜索标题',
                    placeholder: '回车搜索',
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
            label: '高级',
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
                    label: '分类',
                    options: [
                      {
                        label: '全部',
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
                    label: '语言',
                    options: [
                      {
                        label: '全部',
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
    this.user$.pipe(takeUntilDestroyed()).subscribe(user => {
      this.user = user;
    });
    this.tagService.setTitle('着陆页管理');
  }

  ngOnInit(): void {
    this.fetchPage('noCache=1');
    this.currentPage$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(page => {
      this.currentPage = page;
      this.cd.detectChanges();
    });
    this.builder.updateSuccess$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(state => {
      if (state) {
        this.onReload();
      }
    });

    this.route.queryParams.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(query => {
      const { quickEdit, nid, langcode } = query;
      if (quickEdit) {
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
    this.builder.loading$.next(true);
    const { langcode, nid } = page;
    if (!nid) {
      this.util.openSnackbar('请检查 LandingPage View 配置', 'ok');
      return;
    }
    this.builderService.loadPage({ langcode, nid });
  }

  updateByJSON(page: any): void {
    const { langcode, nid } = page;
    if (!nid) {
      this.util.openSnackbar('请检查 LandingPage View 配置', 'ok');
      return;
    }
    this.builderService.loadPageJSON({ langcode, nid });
  }

  updatePageSetting(page: IPageMeta): void {
    this.builder.loading$.next(true);

    this.builderService.openPageSetting(
      page,
      '/api/v1/node/landing_page',
      this.builderService.getPageParams(['uid', 'group', 'cover', 'cover.field_media_image'])
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
    this.builder.loading$.next(true);
    this.nodeService
      .fetch(`/api/v3/landingPage/json/${currentPage.nid}`, 'noCache=1', '', targetlang)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((page: IPage) => {
        this.builder.loading$.next(false);
        if (targetlang === page.langcode) {
          // 已有翻译
          this.util.openSnackbar(`已有${page.label}语言页面，正在载入`, 'ok');
          this.builder.loadNewPage(this.builderService.formatToExtraData(page));
        } else {
          // 复制一份，新建翻译
          this.util.openSnackbar(
            `正在载入${currentPage.title}，请修改页面内容为${targetlang}语言`,
            'ok'
          );
          this.builder.loadNewPage(
            this.builderService.formatToExtraData({
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
