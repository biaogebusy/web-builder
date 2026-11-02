import { MatPaginatorIntlCro } from '@core/service/paginator.service';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltip } from '@angular/material/tooltip';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  DOCUMENT,
  ElementRef,
  viewChild,
  viewChildren,
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
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState, IBuilderPendingPageLoad } from '@core/state/BuilderState';
import { PageItemComponent } from '../page-item/page-item.component';
import type { QueryParams } from '@core/util/http-params.util';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { BaseComponent } from '@uiux/base/base.widget';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

@Component({
  providers: [
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlCro },
    {
      provide: MAT_TOOLTIP_DEFAULT_OPTIONS,
      useValue: {
        showDelay: 500, hideDelay: 100, touchendHideDelay: 1500,
        position: 'above', tooltipClass: 'page-list-tooltip',
      },
    },
  ],
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SHARE_IMPORTS, WIDGETS_IMPORTS, FORM_IMPORTS, MatPaginatorModule, PageItemComponent],
})
export class PageListComponent extends BaseComponent implements OnInit {
  /** Optional builder panel configuration. */
  readonly content = input<unknown>();
  public form = new FormGroup({
    page: new FormControl(0, { nonNullable: true }),
    title: new FormControl('', { nonNullable: true, updateOn: 'submit' }),
    group: new FormControl('', { nonNullable: true }),
    langcode: new FormControl('', { nonNullable: true }),
  });
  public model = this.form.getRawValue();
  readonly filtersOpen = signal(false);
  readonly filterCount = signal(0);
  readonly hasFilters = signal(false);
  private listElement = viewChild<ElementRef<HTMLElement>>('listElement');
  private tooltips = viewChildren(MatTooltip);
  private pageItems = viewChildren(PageItemComponent);
  private document = inject(DOCUMENT);
  public langs = environment.langs;
  private builder = inject(BuilderState);
  private util = inject(UtilitiesService);
  private nodeService = inject(NodeService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private builderService = inject(BuilderService);
  private destroyRef = inject(DestroyRef);
  private translate = inject(TranslateService);
  private pendingPageLoad?: IBuilderPendingPageLoad;

  private dismissTooltip(event: KeyboardEvent): void {
    if (event.key !== 'Escape' || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey
      || !this.document.querySelector('.page-list-tooltip')) return;
    this.tooltips().forEach(tooltip => tooltip.hide(0));
    this.pageItems().forEach(item => item.hideTooltips());
    event.stopPropagation();
    event.preventDefault();
  }

  private queryParams = signal<QueryParams | string>({ noCache: 1 });

  private listRes = this.nodeService.fetchResource(() => ({
    api: '/api/v2/node/landing-page',
    params: this.queryParams(),
  }));

  public loading = this.listRes.isLoading;

  readonly loadError = computed(() => Boolean(this.listRes.error()));

  // Reload retains the resource value, so existing rows and scroll position stay mounted.
  private pageList = computed<IPageList | undefined>(() =>
    this.loadError() ? undefined : this.listRes.value()
  );

  public lists = computed<IPageMeta[] | undefined>(() => this.pageList()?.rows);

  public pager = computed(() => {
    const res = this.pageList();
    return res ? this.handlePager(res.pager, res.rows.length) : undefined;
  });

  public fields: FormlyFieldConfig[] = [
    {
      key: 'title',
      type: 'input',
      props: {
        label: this.translate.instant('BUILDER.PAGE_LIST.SEARCH_TITLE'),
        placeholder: this.translate.instant('BUILDER.PAGE_LIST.SEARCH_PLACEHOLDER'),
        appearance: 'outline',
      },
      modelOptions: { updateOn: 'submit' },
    },
    {
      fieldGroupClassName: 'page-list-filters grid grid-cols-1 gap-2',
      fieldGroup: [
        {
          key: 'group',
          type: 'mat-select',
          props: {
            api: '/api/v2/taxonomy/page_group',
            nocache: true,
            label: this.translate.instant('BUILDER.PAGE_LIST.CATEGORY'),
            appearance: 'outline',
            options: [{ label: this.translate.instant('BUILDER.PAGE_LIST.ALL'), value: '' }],
          },
        },
        {
          key: 'langcode',
          type: 'select',
          props: {
            label: this.translate.instant('BUILDER.PAGE_LIST.LANGUAGE'),
            appearance: 'outline',
            options: [
              { label: this.translate.instant('BUILDER.PAGE_LIST.ALL'), value: '' },
              ...(this.langs ?? []).map(lang => ({ label: lang.label, value: lang.langCode })),
            ],
          },
        },
      ],
    },
  ];

  constructor() {
    super();
    // Capture Escape before the drawer handles it, even when focus is outside this list.
    const dismissTooltip = (event: KeyboardEvent) => this.dismissTooltip(event);
    this.document.addEventListener('keydown', dismissTooltip, true);
    this.destroyRef.onDestroy(() => {
      this.document.removeEventListener('keydown', dismissTooltip, true);
    });
    effect(() => {
      const error = this.listRes.error();
      if (error && 'status' in error && error.status === 404) {
        this.util.openSnackbar(this.translate.instant('BUILDER.SETTINGS.CHECK_API'), 'ok');
      }
    });
    effect(() => {
      const pager = this.pager();
      if (!this.loading() && pager && pager.currentPage > 0 && !this.lists()?.length) {
        this.navigateToPage(Math.max(0, Math.ceil(pager.totalItems / pager.itemsPerPage) - 1));
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
        this.model = {
          title: query['title'] || '',
          group: query['group'] || '',
          langcode: query['langcode'] || '',
          page: Math.max(0, Number(query['page']) || 0),
        };
        this.form.patchValue(this.model, { emitEvent: false });
        this.filterCount.set(
          Number(Boolean(this.model.group)) + Number(Boolean(this.model.langcode))
        );
        this.hasFilters.set(Boolean(this.model.title || this.filterCount()));
        this.queryParams.set(this.getApiParams({ ...this.model, noCache: 1 }));
      }
    });
  }

  /** Apply search or filters from the first page. */
  onModelChange(): void {
    this.navigateToPage(0);
  }

  private navigateToPage(page: number): void {
    this.form.controls.page.setValue(page, { emitEvent: false });
    const list = this.listElement()?.nativeElement;
    if (list) list.scrollTop = 0;
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: this.form.getRawValue(),
    });
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

  /** Pagination keeps all active filters. */
  onPageChange(page: PageEvent): void {
    this.navigateToPage(page.pageIndex);
  }

  /** Refresh data without changing filters, pagination or scroll position. */
  onReload(): void {
    this.listRes.reload();
  }

  /** Clear only the list query and return to its first page. */
  onReset(): void {
    this.form.reset({ title: '', group: '', langcode: '', page: 0 }, { emitEvent: false });
    this.model = this.form.getRawValue();
    this.navigateToPage(0);
  }

  /** Open the existing new-page flow. */
  onNewPage(): void {
    this.builder.onNewPage();
  }
}
