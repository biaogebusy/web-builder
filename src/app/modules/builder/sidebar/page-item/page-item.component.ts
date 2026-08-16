import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  inject,
  input,
  output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { IPage } from '@core/interface/IAppConfig';
import { IPageMeta } from '@core/interface/IBuilder';
import { IDialog } from '@core/interface/IDialog';
import { BuilderService } from '@core/service/builder.service';
import { NodeService } from '@core/service/node.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import { BUILDER_CURRENT_PAGE } from '@core/token/token-providers';
import { formatToExtraData, getPageParams, isTranslationLang } from '@core/util/builder-page.util';
import { SHARE_IMPORTS } from '@share/share-imports';
import { WIDGETS_IMPORTS } from '@uiux/widgets/widgets-imports';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-page-item',
  templateUrl: './page-item.component.html',
  styleUrls: ['./page-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SHARE_IMPORTS, WIDGETS_IMPORTS],
})
export class PageItemComponent {
  /** Page meta rendered by this row */
  readonly page = input.required<IPageMeta>();
  /** Emitted after a delete succeeds so the owning list can reload */
  readonly refresh = output<void>();

  public langs = environment.langs;
  private currentPage = inject(BUILDER_CURRENT_PAGE);
  private builder = inject(BuilderState);
  private dialog = inject(MatDialog);
  private util = inject(UtilitiesService);
  private nodeService = inject(NodeService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private builderService = inject(BuilderService);
  private destroyRef = inject(DestroyRef);
  private translate = inject(TranslateService);

  /** True when this row is the page currently loaded in the builder */
  readonly active = computed(() => {
    const current = this.currentPage();
    if (!current) {
      return false;
    }
    const page = this.page();
    return current.nid === page.nid && current.langcode === page.langcode;
  });

  /** Language label of the translation draft being edited, empty when not editing one */
  readonly translationDraft = computed(() => {
    const current = this.currentPage();
    if (!this.active() || !current || !current.translation || !current.target) {
      return '';
    }
    return this.getLangLabel(current.target);
  });

  loadPage(): void {
    this.builder.loading.set(true);
    const { langcode, nid } = this.page();
    if (!nid) {
      this.builder.loading.set(false);
      this.util.openSnackbar(this.translate.instant('BUILDER.PAGE_LIST.CHECK_LANDING_VIEW'), 'ok');
      return;
    }
    this.clearPageLoadQueryParams();
    this.builderService.loadPage({ langcode, nid });
  }

  copyPage(): void {
    const { langcode, nid } = this.page();
    this.builderService.loadPage({
      langcode,
      nid,
      isTemplate: true,
    });
  }

  updateByJSON(): void {
    const { langcode, nid } = this.page();
    if (!nid) {
      this.util.openSnackbar(this.translate.instant('BUILDER.PAGE_LIST.CHECK_LANDING_VIEW'), 'ok');
      return;
    }
    this.builderService.loadPageJSON({ langcode, nid });
  }

  updatePageSetting(): void {
    this.builder.loading.set(true);

    this.builderService.openPageSetting(
      this.page(),
      '/api/v1/node/landing_page',
      getPageParams(['uid', 'group', 'cover', 'cover.field_media_image'])
    );
  }

  createLangVersion(targetlang: string): void {
    const currentPage = this.page();
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

  deletePage(): void {
    const page = this.page();
    const translation = this.isTranslation();
    const lang = this.getLangLabel(page.langcode);
    const config: IDialog = translation
      ? {
          title: this.translate.instant('BUILDER.PAGE_SETTING.DELETE_TRANSLATION_TITLE'),
          noLabel: this.translate.instant('BUILDER.COMMON.CANCEL'),
          yesLabel: this.translate.instant('BUILDER.PAGE_SETTING.DELETE_TRANSLATION'),
          inputData: {
            content: {
              type: 'text',
              fullWidth: true,
              body: this.translate.instant('BUILDER.PAGE_SETTING.DELETE_TRANSLATION_CONFIRM', {
                title: page.title,
                lang,
              }),
            },
          },
        }
      : {
          title: this.translate.instant('BUILDER.PAGE_LIST.DELETE_TITLE'),
          noLabel: this.translate.instant('BUILDER.COMMON.CANCEL'),
          yesLabel: this.translate.instant('BUILDER.PAGE_SETTING.DELETE'),
          inputData: {
            content: {
              type: 'text',
              fullWidth: true,
              body: this.translate.instant(
                environment.multiLang
                  ? 'BUILDER.PAGE_SETTING.DELETE_ALL_LANG_CONFIRM'
                  : 'BUILDER.PAGE_LIST.DELETE_CONFIRM',
                { title: page.title }
              ),
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
        const request$ = translation
          ? this.builderService.deleteTranslation(page.nid, page.langcode)
          : this.nodeService.deleteEntity('/api/v1/node/landing_page', page.uuid);
        request$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
          next: () => {
            this.builder.loading.set(false);
            this.util.openSnackbar(
              translation
                ? this.translate.instant('BUILDER.PAGE_SETTING.DELETE_TRANSLATION_SUCCESS', {
                    title: page.title,
                    lang,
                  })
                : this.translate.instant('BUILDER.PAGE_SETTING.DELETE_SUCCESS', {
                    title: page.title,
                  }),
              'ok'
            );
            this.refresh.emit();
          },
          error: err => {
            this.builder.loading.set(false);
            if (err.status === 403) {
              this.util.openSnackbar(this.translate.instant('BUILDER.PAGE_SETTING.NO_PERMISSION'));
            } else {
              this.util.openSnackbar(
                translation
                  ? this.translate.instant('BUILDER.PAGE_SETTING.DELETE_TRANSLATION_FAIL', {
                      title: page.title,
                      lang,
                    })
                  : this.translate.instant('BUILDER.PAGE_SETTING.DELETE_FAIL', {
                      title: page.title,
                    })
              );
            }
          },
        });
      });
  }

  getLangLabel(code: string): string {
    return this.langs?.find(l => l.langCode === code)?.label ?? code;
  }

  isTranslation(): boolean {
    return isTranslationLang(this.page().langcode);
  }

  // The builder deep-links a page load through query params; drop them once consumed
  // so a later reload does not re-trigger the same load
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
}
