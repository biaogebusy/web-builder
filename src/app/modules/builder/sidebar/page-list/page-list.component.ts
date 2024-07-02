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
import { IPage } from '@core/interface/IAppConfig';
import { IPageItem, IPageList } from '@core/interface/IBuilder';
import { IUser } from '@core/interface/IUser';
import { IPager } from '@core/interface/widgets/IWidgets';
import { BuilderService } from '@core/service/builder.service';
import { NodeService } from '@core/service/node.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import { BUILDER_CURRENT_PAGE, USER } from '@core/token/token-providers';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { BaseComponent } from '@uiux/base/base.widget';
import { merge } from 'lodash-es';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

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
  currentPage?: IPage;
  langs = environment.langs;
  builder = inject(BuilderState);
  util = inject(UtilitiesService);
  nodeService = inject(NodeService);
  builderService = inject(BuilderService);
  cd = inject(ChangeDetectorRef);
  constructor(
    @Inject(BUILDER_CURRENT_PAGE) public currentPage$: Observable<IPage>,
    @Inject(USER) private user: IUser,
  ) {
    super();
  }

  ngOnInit(): void {
    this.fetchPage('noCache=1');
    this.currentPage$.pipe(takeUntil(this.destroy$)).subscribe((page) => {
      this.currentPage = page;
      this.cd.detectChanges();
    });
    this.builder.updateSuccess$
      .pipe(takeUntil(this.destroy$))
      .subscribe((state) => {
        if (state) {
          this.onReload();
        }
      });
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

  loadPage(page: IPageItem): void {
    this.util.openSnackbar(`正在加载${page.title}`, 'ok');
    this.builder.loading$.next(true);
    this.builderService.loadPage({ langcode: page.langcode, id: page.id });
  }

  updatePage(page: IPageItem): void {
    this.builder.rightContent$.next({
      mode: 'over',
      hasBackdrop: false,
      style: {
        width: '318px',
        'max-width': 'calc(100vw - 50px)',
      },
      elements: [
        {
          type: 'page-setting',
          content: page,
        },
      ],
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

  createLangVersion(page: IPageItem, langCode: string): void {
    this.builder.loading$.next(true);
    this.nodeService
      .fetch(`/api/v3/landingPage/json/${page.id}`, 'noCache=1', '', langCode)
      .pipe(takeUntil(this.destroy$))
      .subscribe((page: IPage) => {
        this.builder.loading$.next(false);
        if (langCode === page.langcode) {
          // 已有翻译
          this.util.openSnackbar(`已有${page.label}语言页面，正在载入`, 'ok');
          this.builder.loadNewPage(this.builderService.formatToExtraData(page));
        } else {
          // 复制一份，新建翻译
          this.util.openSnackbar(
            `正在载入${page.label}，请修改为${langCode}语言`,
            'ok',
          );
          this.builder.loadNewPage(
            this.builderService.formatToExtraData({
              ...page,
              translation: true,
              target: langCode,
            }),
          );
        }
      });
  }

  onReload(): void {
    this.onModelChange({ title: '', time: +new Date() });
  }

  ngOnDestroy(): void {
    if (this.destroy$.next) {
      this.destroy$.next(true);
      this.destroy$.unsubscribe();
    }
  }
}
