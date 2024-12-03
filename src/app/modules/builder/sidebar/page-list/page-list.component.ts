import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  Inject,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
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
})
export class PageListComponent extends BaseComponent implements OnInit {
  @Input() content: any;
  content$: Observable<IPageMeta[]>;
  form = new FormGroup({
    page: new FormControl(0),
  });
  model: any = {
    noCache: true,
  };
  loading = false;
  pager: IPager;
  currentEditeTitle: string;
  langs = environment.langs;
  currentPage?: IPage;
  builder = inject(BuilderState);
  cd = inject(ChangeDetectorRef);
  util = inject(UtilitiesService);
  nodeService = inject(NodeService);
  router = inject(ActivatedRoute);
  builderService = inject(BuilderService);
  private destroyRef = inject(DestroyRef);
  private tagService = inject(TagsService);
  user: IUser;

  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'grid grid-cols-12 gap-2',
      fieldGroup: [
        {
          key: 'title',
          type: 'input',
          className: 'col-span-7',
          props: {
            label: '搜索标题',
            type: 'search',
          },
          modelOptions: {
            updateOn: 'submit',
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
  ];
  constructor(
    @Inject(BUILDER_CURRENT_PAGE) public currentPage$: Observable<IPage>,
    @Inject(USER) private user$: Observable<IUser>
  ) {
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

    this.router.queryParams.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(query => {
      const { nid, langcode } = query;
      if (nid) {
        this.loadPage({
          nid,
          langcode,
          title: '页面',
        });
      }
    });
  }

  onModelChange(value: any): void {
    this.form.get('page')?.patchValue(0, { onlySelf: true, emitEvent: false });
    const formValue = merge(value, this.form.getRawValue());
    const params = this.getApiParams({ ...formValue, noCache: 1 });
    this.fetchPage(params);
  }

  enableEditor(event: any): void {
    const { currentTarget } = event;
    if (currentTarget) {
      const title = currentTarget.previousElementSibling;
      this.currentEditeTitle = title.textContent.trim();
      title.contentEditable = 'true';
    }
  }

  onTitle(event: any, page: IPageMeta): void {
    const { target } = event;
    if (target) {
      target.contentEditable = 'false';
      if (this.currentEditeTitle !== target.textContent.trim()) {
        this.builder.loading$.next(true);
        const {
          target: { textContent },
        } = event;
        if (textContent) {
          this.builderService
            .updateAttributes(
              page,
              '/api/v1/node/landing_page',
              {
                title: textContent,
              },
              {
                uid: {
                  data: {
                    type: 'user--user',
                    id: this.user.id,
                  },
                },
              }
            )
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(res => {
              this.builder.loading$.next(false);
              this.util.openSnackbar(`已更新标题为${textContent}`, 'ok');
              this.builder.currentPage.title = textContent;
              this.builder.saveLocalVersions();
            });
        }
      }
    }
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
    this.util.openSnackbar(`正在加载${page.title}`, 'ok');
    this.builder.loading$.next(true);
    this.builderService.loadPage({ langcode: page.langcode, nid: page.nid });
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
    this.onModelChange({ title: '', time: +new Date() });
  }
}
