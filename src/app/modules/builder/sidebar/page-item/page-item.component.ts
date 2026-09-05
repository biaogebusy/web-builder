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
import { IPage } from '@core/interface/IAppConfig';
import { IPageMeta, IPageRevisionPanel } from '@core/interface/IBuilder';
import { IDialog } from '@core/interface/IDialog';
import { BuilderService } from '@core/service/builder.service';
import { NodeService } from '@core/service/node.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import { BUILDER_CURRENT_PAGE } from '@core/token/token-providers';
import {
  formatToExtraData,
  getApiLang,
  getPageParams,
  isTranslationLang,
} from '@core/util/builder-page.util';
import { appendQueryParams } from '@core/util/http-params.util';
import { SHARE_IMPORTS } from '@share/share-imports';
import { WIDGETS_IMPORTS } from '@uiux/widgets/widgets-imports';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
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
  /** Emitted after the page is handed to the builder, for list level follow up */
  readonly pageLoad = output<IPageMeta>();

  public readonly langs = environment.langs;
  public readonly showLanguage =
    environment.multiLang && Boolean(environment.langs && environment.langs.length > 1);
  private currentPage = inject(BUILDER_CURRENT_PAGE);
  private builder = inject(BuilderState);
  private dialog = inject(MatDialog);
  private util = inject(UtilitiesService);
  private nodeService = inject(NodeService);
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
    // A translation draft lives under its target language, so compare the same identity the
    // local version list uses; otherwise the source row would claim to be the edited page
    return (
      current.nid === page.nid &&
      this.builder.getPageIdentityLang(current) === this.builder.getPageIdentityLang(page)
    );
  });

  /**
   * Language label of the translation draft started from this row, empty when there is none.
   * Shown on the source language row, which is the only entry point when the translation does
   * not exist on the server yet.
   */
  readonly translationDraft = computed(() => {
    const current = this.currentPage();
    if (!current || !current.translation || !current.target) {
      return '';
    }
    const page = this.page();
    if (current.nid !== page.nid || (current.langcode ?? '') !== page.langcode) {
      return '';
    }
    return this.getLangLabel(current.target);
  });

  /** True when this page has a local version with changes not saved to the server. */
  readonly dirty = computed(() => this.builder.isPageDirty(this.page()));

  readonly previewUrl = computed(() => appendQueryParams(this.page().url || '', { preview: true }));

  /** Title click: the page is already open, so opening it again would be a no-op */
  loadPage(): void {
    if (this.active()) {
      return;
    }
    this.openPage();
  }

  /**
   * The single way to put this page in the builder. It only asks which version to open when a
   * local draft would otherwise be picked or overwritten silently, so the common case where no
   * draft exists stays one click.
   */
  openPage(): void {
    const localPage = this.builder.getLocalPageByPage(this.page());
    if (localPage?.dirty) {
      this.openDraftChoiceDialog(localPage);
      return;
    }
    this.loadPageFromServer();
  }

  // Dismissing the dialog keeps the draft, so unsaved work is only ever lost by a deliberate click
  private openDraftChoiceDialog(localPage: IPage): void {
    const config: IDialog = {
      title: this.translate.instant('BUILDER.PAGE_LIST.OPEN_DRAFT_TITLE'),
      noLabel: this.translate.instant('BUILDER.PAGE_LIST.OPEN_DRAFT_KEEP'),
      yesLabel: this.translate.instant('BUILDER.PAGE_LIST.OPEN_DRAFT_SERVER'),
      inputData: {
        content: {
          type: 'text',
          fullWidth: true,
          body: this.translate.instant('BUILDER.PAGE_LIST.OPEN_DRAFT_CONFIRM', {
            title: this.page().title,
          }),
        },
      },
    };
    this.dialog
      .open(DialogComponent, { width: '340px', data: config })
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(fromServer => {
        if (fromServer) {
          this.loadPageFromServer();
          return;
        }
        this.loadLocalDraft(localPage);
      });
  }

  private loadLocalDraft(localPage: IPage): void {
    const page = this.page();
    this.builder.loading.set(false);
    this.builder.loadNewPage(localPage);
    this.util.openSnackbar(
      this.translate.instant('BUILDER.PAGE_LIST.LOADING_LOCAL_DRAFT', { title: page.title }),
      'ok'
    );
    this.pageLoad.emit(page);
  }

  private loadPageFromServer(): void {
    const page = this.page();
    const { langcode, nid } = page;
    if (!nid) {
      this.util.openSnackbar(this.translate.instant('BUILDER.PAGE_LIST.CHECK_LANDING_VIEW'), 'ok');
      return;
    }
    this.builder.loading.set(true);
    this.util.openSnackbar(
      this.translate.instant('BUILDER.PAGE_LIST.LOADING_PAGE', { title: page.title }),
      'ok'
    );
    this.builderService.loadPage({ langcode, nid });
    this.pageLoad.emit(page);
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

  /** Open the server side revision list of this page in the right drawer */
  openRevisions(): void {
    const page = this.page();
    if (!page.nid) {
      this.util.openSnackbar(this.translate.instant('BUILDER.PAGE_LIST.CHECK_LANDING_VIEW'), 'ok');
      return;
    }
    const element: IPageRevisionPanel = {
      type: 'page-revision',
      fullWidth: true,
      content: {
        nid: page.nid,
        title: page.title,
        langcode: page.langcode,
      },
    };
    this.builder.rightContent$.next({
      title: this.translate.instant('BUILDER.REVISION.TITLE'),
      mode: 'over',
      hasBackdrop: true,
      style: {
        'width': '420px',
        'max-width': 'calc(100vw - 50px)',
      },
      elements: [element],
    });
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
    if (!currentPage.nid) {
      this.util.openSnackbar(this.translate.instant('BUILDER.PAGE_LIST.CHECK_LANDING_VIEW'), 'ok');
      return;
    }
    const localTranslation = this.builder.getLocalPageByPage({
      nid: currentPage.nid,
      langcode: targetlang,
    });
    // Only an unsaved draft may skip the server; a synced local copy can be stale
    if (localTranslation?.dirty) {
      this.builder.loadNewPage(localTranslation);
      this.util.openSnackbar(
        this.translate.instant('BUILDER.PAGE_LIST.LOADING_LOCAL_TRANSLATION', {
          title: currentPage.title,
          lang: this.getLangLabel(targetlang),
        }),
        'ok'
      );
      this.pageLoad.emit(currentPage);
      return;
    }
    const lang = this.langs?.find(l => l.langCode === targetlang);
    this.builder.loading.set(true);
    this.nodeService
      .fetch(`/api/v3/landingPage/json/${currentPage.nid}`, { noCache: 1 }, targetlang)
      .pipe(
        switchMap((page: IPage) => {
          if (page.langcode === targetlang) {
            return of({ existing: page });
          }
          // The target request fell back to another language, so its body is not what
          // this row should be translated from: fetch this row's own language.
          return this.nodeService
            .fetch(
              `/api/v3/landingPage/json/${currentPage.nid}`,
              { noCache: 1 },
              getApiLang(currentPage.langcode)
            )
            .pipe(map((source: IPage) => ({ source })));
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: ({ existing, source }: { existing?: IPage; source?: IPage }) => {
          this.builder.loading.set(false);
          if (existing) {
            this.util.openSnackbar(
              this.translate.instant('BUILDER.PAGE_LIST.TRANSLATION_EXISTS', {
                label: existing.label || lang?.label || targetlang,
              }),
              'ok'
            );
            this.builder.loadNewPage(formatToExtraData(existing));
            this.pageLoad.emit(currentPage);
            return;
          }
          const label = lang?.label || targetlang;
          this.openCreateTranslationDialog(currentPage, targetlang, source as IPage, label);
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
  }

  private openCreateTranslationDialog(
    currentPage: IPageMeta,
    targetlang: string,
    sourcePage: IPage,
    langLabel: string
  ): void {
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
            lang: langLabel,
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
        this.util.openSnackbar(
          this.translate.instant('BUILDER.PAGE_LIST.LOADING_TRANSLATION', {
            title: currentPage.title,
            lang: langLabel,
          }),
          'ok'
        );
        this.builder.loadNewPage(
          formatToExtraData({
            ...sourcePage,
            langcode: currentPage.langcode,
            translation: true,
            target: targetlang,
          })
        );
        this.pageLoad.emit(currentPage);
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
            this.builder.deleteLocalPageByPage(page, !translation);
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
}
