import { DestroyRef, Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ApiService } from './api.service';
import type { IPage } from '@core/interface/IAppConfig';
import { firstValueFrom, forkJoin, Observable, of, Subscription, throwError, timer } from 'rxjs';
import { UtilitiesService } from './utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import { NodeService } from './node.service';
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { ContentService } from './content.service';
import { isArray } from 'lodash-es';
import { IDialog } from '@core/interface/IDialog';
import { IJsoneditor } from '@core/interface/widgets/IJsoneditor';
import type { IPageRevisionList } from '@core/interface/IBuilder';
import {
  coverExtraData,
  formatPage,
  formatToExtraData,
  getApiLang,
  getPageParams,
} from '@core/util/builder-page.util';
import { appendQueryParams, type QueryParams } from '@core/util/http-params.util';
import { TranslateService } from '@ngx-translate/core';

const BUILDERPATH = '/builder';
const VERSION_KEY = 'version';
const VERSION_CHECK_INTERVAL = 30000;
// Landing page read/write APIs: paths are identical across deployments; the domain is
// decided by apiUrl (see environments / config/proxy.config.js)
const LANDING_PAGE_API = {
  create: '/api/v3/landingPage/builder',
  update: '/api/v3/landingPage/update',
  translate: '/api/v3/landingPage/translations',
};

/** The `path` field of a node as JSON:API serializes it. */
interface INodePath {
  pid?: number | string | null;
  alias?: string | null;
  /**
   * Pathauto state: 0 marks the alias as written by hand. Only writable on a backend
   * that runs the pathauto module, and never part of a JSON:API response — the property
   * is computed, and JSON:API treats computed properties as internal.
   */
  pathauto?: number;
}

/**
 * Whether a failed alias write is a backend telling us its `path` field has no pathauto
 * property, which is how JSON:API answers a write to a property a field type does not
 * define — a 422 naming the property, the same status a taken alias comes back with.
 */
function isMissingPathautoProperty(error: any): boolean {
  if (error?.status !== 422) {
    return false;
  }
  const body = error.error;
  const detail = isArray(body?.errors)
    ? body.errors.map((item: any) => item?.detail ?? '').join(' ')
    : typeof body === 'string'
      ? body
      : '';
  return detail.includes('pathauto');
}

@Injectable({
  providedIn: 'root',
})
export class BuilderService extends ApiService {
  private dialog = inject(MatDialog);
  private builder = inject(BuilderState);
  private util = inject(UtilitiesService);
  private nodeService = inject(NodeService);
  private contentService = inject(ContentService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  private storage = inject(LocalStorageService);
  private translate = inject(TranslateService);
  private versionCheckSub?: Subscription;
  private versionDialogOpen = false;
  // Cleared for good once a backend answers that its `path` field has no pathauto
  // property, so the rest of the session stops asking for it
  private writePathautoFlag = true;

  constructor() {
    super();
  }

  loadPage(
    page: { langcode?: string; nid: string; isTemplate?: boolean },
    openSetting = false
  ): void {
    const { langcode, nid, isTemplate } = page;
    const lang = getApiLang(langcode);
    this.nodeService
      .fetch(`/api/v3/landingPage/json/${nid}`, { noCache: 1 }, lang)
      .pipe(take(1))
      .subscribe({
        next: (content: IPage) => {
          const { body, status, uuid } = content;
          this.builder.loading.set(false);
          if (status) {
            this.builder.loadNewPage(formatToExtraData(content, isTemplate));
            this.util.openSnackbar(
              this.translate.instant(
                isTemplate ? 'BUILDER.PAGE_LIST.COPIED_PAGE' : 'BUILDER.PAGE_LIST.LOADED_PAGE',
                { title: content.title }
              ),
              'ok'
            );
            if (openSetting) {
              const config: IDialog = {
                title: this.translate.instant('BUILDER.PAGE_LIST.PAGE_PROPS'),
                noLabel: this.translate.instant('BUILDER.COMMON.CANCEL'),
                yesLabel: this.translate.instant('BUILDER.COMMON.CONFIRM'),
                inputData: {
                  content: {
                    type: 'text',
                    fullWidth: true,
                    body: this.translate.instant('BUILDER.PAGE_LIST.OPEN_PAGE_PROPS_CONFIRM'),
                  },
                },
              };
              const dialogRef = this.dialog.open(DialogComponent, {
                width: '340px',
                data: config,
              });

              dialogRef
                .afterClosed()
                .pipe(take(1))
                .subscribe(result => {
                  if (result && uuid) {
                    this.openPageSetting(
                      { uuid, langcode },
                      '/api/v1/node/landing_page',
                      getPageParams(['uid', 'group', 'cover', 'cover.field_media_image'])
                    );
                  }
                });
            }

            if (body.length === 0) {
              this.util.openSnackbar(
                this.translate.instant('BUILDER.PAGE_LIST.EMPTY_PAGE_INITIALIZED'),
                'ok'
              );
            }
          } else {
            this.util.openSnackbar(
              this.translate.instant('BUILDER.PAGE_LIST.NOT_BUILDER_PAGE'),
              'ok'
            );
          }
        },
        error: () => {
          this.builder.loading.set(false);
          this.util.openSnackbar(this.translate.instant('BUILDER.PAGE_LIST.LOAD_PAGE_FAIL'), 'ok');
        },
      });
  }

  loadPageJSON(page: { langcode?: string; nid: string }): void {
    const { langcode, nid } = page;
    const lang = getApiLang(langcode);
    this.nodeService
      .fetch(`/api/v3/landingPage/json/${nid}`, { noCache: 1 }, lang)
      .pipe(take(1))
      .subscribe((content: IPage) => {
        const { status } = content;
        if (status) {
          const jsonWidget: IJsoneditor = {
            type: 'jsoneditor',
            data: formatToExtraData(content),
            classes: 'full-height',
            schemaType: 'page',
            fullWidth: true,
            actions: [
              {
                type: 'updatePage',
                label: '更新JSON',
                params: {
                  nid,
                  langcode,
                },
              },
            ],
          };
          this.builder.rightContent$.next({
            title: 'JSON',
            mode: 'over',
            hasBackdrop: true,
            style: {
              width: '800px',
            },
            elements: [jsonWidget],
          });
        } else {
          this.util.openSnackbar('该页面非builder创建，请到后台编辑', 'ok');
        }
      });
  }

  /**
   * Server side revision list of a landing page, newest first.
   */
  getPageRevisions(page: { langcode?: string; nid: string }): Observable<IPageRevisionList> {
    const { langcode, nid } = page;
    return this.nodeService.fetch(
      `/api/v3/landingPage/revisions/${nid}`,
      { noCache: 1 },
      getApiLang(langcode)
    );
  }

  /**
   * Page JSON of a single revision, without touching the local draft.
   */
  getPageRevision(page: { langcode?: string; nid: string; vid: string }): Observable<IPage> {
    const { langcode, nid, vid } = page;
    return this.nodeService.fetch(
      `/api/v3/landingPage/revisions/${nid}/${vid}`,
      { noCache: 1 },
      getApiLang(langcode)
    );
  }

  /**
   * Load one revision into the local draft. The payload reports the *current* revision id and
   * changed time, so the following save still commits on top of the latest revision instead of
   * being rejected as stale.
   */
  loadPageRevision(page: { langcode?: string; nid: string; vid: string }): void {
    const { vid } = page;
    this.builder.loading.set(true);
    this.getPageRevision(page)
      .pipe(take(1))
      .subscribe({
        next: (content: IPage) => {
          this.builder.loading.set(false);
          if (!content?.status) {
            this.util.openSnackbar(this.translate.instant('BUILDER.REVISION.LOAD_FAIL'), 'ok');
            return;
          }
          // The restored content differs from what the server renders until it is saved, so the
          // draft has to start out dirty
          this.builder.loadNewPage({
            ...formatToExtraData(content),
            dirty: true,
            revisionVid: vid,
          });
          this.util.openSnackbar(this.translate.instant('BUILDER.REVISION.LOADED', { vid }), 'ok');
        },
        error: () => {
          this.builder.loading.set(false);
          this.util.openSnackbar(this.translate.instant('BUILDER.REVISION.LOAD_FAIL'), 'ok');
        },
      });
  }

  /**
   * Publish an old revision as the newest one, the way Drupal reverts: the content of `vid` is
   * saved on top of the current revision, so nothing is removed from the history.
   *
   * The revision is fetched again instead of reusing the draft on the canvas, so the restore
   * always commits exactly what the list offered, even after the preview was edited.
   */
  restoreRevision(page: { langcode?: string; nid: string; vid: string }): void {
    const { langcode, nid, vid } = page;
    const config: IDialog = {
      title: this.translate.instant('BUILDER.REVISION.RESTORE_TITLE'),
      noLabel: this.translate.instant('BUILDER.COMMON.CANCEL'),
      yesLabel: this.translate.instant('BUILDER.REVISION.RESTORE_YES'),
      inputData: {
        content: {
          type: 'text',
          fullWidth: true,
          body: this.translate.instant('BUILDER.REVISION.RESTORE_CONFIRM', { vid }),
        },
      },
    };
    this.dialog
      .open(DialogComponent, { width: '340px', data: config })
      .afterClosed()
      .pipe(
        filter(Boolean),
        switchMap(() => {
          this.builder.loading.set(true);
          return this.nodeService.fetch(
            `/api/v3/landingPage/revisions/${nid}/${vid}`,
            { noCache: 1 },
            getApiLang(langcode)
          );
        }),
        switchMap((content: IPage) =>
          content?.status
            ? this.updateLandingPage({ ...formatToExtraData(content), langcode, nid }, false)
            : of({ status: false, message: this.translate.instant('BUILDER.REVISION.LOAD_FAIL') })
        ),
        catchError(() => of({ status: false, message: '' })),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((res: any) => {
        if (!res?.status) {
          this.builder.loading.set(false);
          this.util.openSnackbar(
            res?.message || this.translate.instant('BUILDER.REVISION.RESTORE_FAIL'),
            'ok'
          );
          return;
        }
        this.reloadRestoredPage({ langcode, nid });
        this.util.openSnackbar(
          this.translate.instant('BUILDER.REVISION.RESTORE_SUCCESS', { vid }),
          'ok'
        );
      });
  }

  /**
   * Replace the draft with the revision the restore just created, so `vid`/`changed` match the
   * server again and the staleness poll stays quiet. The right drawer keeps its revision list
   * open, unlike `loadPage`, because the list is what the restore was started from.
   *
   * A restore can be started from the page list for a page that is not on the canvas, which must
   * not steal the canvas from the page being edited: its local copy is dropped instead, so the
   * next open reads the restored content from the server.
   */
  private reloadRestoredPage(page: { langcode?: string; nid: string }): void {
    const { langcode, nid } = page;
    if (!this.builder.getLocalPageByPage(page)?.current) {
      this.builder.deleteLocalPageByPage(page);
      this.builder.loading.set(false);
      this.builder.updateSuccess$.next(true);
      return;
    }
    this.nodeService
      .fetch(`/api/v3/landingPage/json/${nid}`, { noCache: 1 }, getApiLang(langcode))
      .pipe(take(1))
      .subscribe({
        next: (content: IPage) => {
          this.builder.loading.set(false);
          if (content?.status) {
            this.builder.loadNewPage(formatToExtraData(content), false);
          }
          this.builder.updateSuccess$.next(true);
        },
        error: () => {
          this.builder.loading.set(false);
          this.builder.updateSuccess$.next(true);
        },
      });
  }

  /**
   * Save a page edited as raw JSON from the page list, outside the builder canvas.
   * `body` items are referenced json nodes, so the write goes through the landing page
   * endpoint; JSON:API cannot patch them as a plain attribute.
   */
  updatePageJSON(page: { langcode?: string; nid: string }, editedPage: IPage): Observable<boolean> {
    const { langcode, nid } = page;
    return this.updateLandingPage({ ...editedPage, langcode, nid }, false).pipe(
      catchError(() => {
        // A rejected save is reported by updateLandingPage; a failed request never gets there
        this.util.openSnackbar('更新失败，请重试', 'ok');
        return of({ status: false });
      }),
      map((res: any) => {
        this.builder.loading.set(false);
        if (!res.status) {
          return false;
        }
        this.util.openSnackbar('更新成功！', 'ok');
        this.syncLocalPageAfterJSONUpdate(page);
        return true;
      })
    );
  }

  /**
   * The saved page may also live in the local version list, where it is now stale. A clean
   * copy on the canvas is reloaded in place; a background copy is dropped so it is fetched
   * again next time it is opened. A dirty canvas draft is left alone on purpose:
   * `checkIsLatestPage` prompts before overwriting unsaved work.
   */
  private syncLocalPageAfterJSONUpdate(page: { langcode?: string; nid: string }): void {
    const localPage = this.builder.getLocalPageByPage(page);
    if (!localPage) {
      return;
    }
    if (!localPage.current) {
      this.builder.deleteLocalPageByPage(page);
      return;
    }
    if (!localPage.dirty) {
      this.loadPage(page);
    }
  }

  checkIsLatestPage(checkPage: IPage): void {
    if (!checkPage?.nid) {
      return;
    }
    this.versionCheckSub?.unsubscribe();
    this.versionCheckSub = timer(0, VERSION_CHECK_INTERVAL)
      .pipe(
        filter(() => this.router.url.includes(BUILDERPATH) && !this.versionDialogOpen),
        map(() => this.getLocalCurrentPage()),
        filter((localPage): localPage is IPage => Boolean(localPage?.nid)),
        switchMap(localPage => {
          const lang = getApiLang(localPage.langcode);
          return this.nodeService
            .fetch(`/api/v3/landingPage/json/${localPage.nid}`, { noCache: 1 }, lang)
            .pipe(
              map((serverPage: IPage) => ({ localPage, serverPage })),
              catchError(() => of(null))
            );
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(result => {
        if (!result) {
          return;
        }
        const { localPage, serverPage } = result;
        const localChanged = Number(localPage.changed);
        const serverChanged = Number(serverPage?.changed);
        if (!Number.isFinite(localChanged) || !Number.isFinite(serverChanged)) {
          return;
        }
        if (localChanged < serverChanged) {
          this.promptLatestUpdate(localPage, serverPage);
        }
      });
  }

  private getLocalCurrentPage(): IPage | undefined {
    const version = this.storage.retrieve(VERSION_KEY);
    if (!isArray(version)) {
      return undefined;
    }
    return version.find((page: IPage) => page.current === true);
  }

  private promptLatestUpdate(localPage: IPage, serverPage: IPage): void {
    const config: IDialog = {
      title: `当前页面不是最新版本`,
      titleClasses: 'text-red-500',
      yesLabel: '确认更新',
      noLabel: '取消',
      inputData: {
        content: {
          type: 'text',
          fullWidth: true,
          body: `是否要拉取<strong class="text-black-500">[${localPage.title}]</strong>最新的更新覆盖当前页面？`,
        },
      },
    };
    this.versionDialogOpen = true;
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '340px',
      data: config,
    });

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe(result => {
        this.versionDialogOpen = false;
        if (result) {
          this.builder.loadNewPage(formatToExtraData(serverPage));
        }
      });
  }

  loadNodeJson(page: { langcode?: string; nid: string; uuid: string; schemaType: string }): void {
    this.builder.loading.set(true);
    const { langcode, nid, uuid, schemaType } = page;
    const lang = getApiLang(langcode);
    this.nodeService
      .fetch('/api/v3/landingPage', { content: `/node/${nid}`, noCache: 1 }, lang)
      .pipe(take(1))
      .subscribe((newPage: IPage) => {
        const jsonWidget: IJsoneditor = {
          type: 'jsoneditor',
          data: newPage,
          isSetting: true,
          fullWidth: true,
          schemaType,
          actions: [
            {
              type: 'update',
              label: '更新配置',
              params: {
                reqRoles: ['administrator', 'webmaster'],
                uuid,
                langcode,
                api: '/api/v1/node/json',
                type: 'node--json',
              },
            },
          ],
        };
        const config: IDialog = {
          disableActions: true,
          inputData: {
            content: jsonWidget,
          },
        };
        this.builder.loading.set(false);
        this.dialog.open(DialogComponent, {
          width: '1000px',
          panelClass: ['close-outside', 'close-icon-white'],
          data: config,
        });
      });
  }

  createLandingPage(page: IPage, loadPage = true): Observable<any> {
    this.builder.loading.set(true);
    return this.http
      .post(
        `${this.apiUrl}${LANDING_PAGE_API.create}`,
        formatPage(page),
        this.optionsWithBearerToken()
      )
      .pipe(
        tap((res: any) => {
          const {
            data: { nid },
          } = res;
          if (loadPage) {
            this.loadPage({ nid }, true);
          }
        }),
        catchError((error: any) => {
          this.builder.loading.set(false);
          if (error?.status === 403) {
            this.util.openSnackbar('无权限执行此操作', 'ok');
          } else {
            this.util.openSnackbar('创建页面失败，请重试', 'ok');
          }
          return of(false);
        })
      );
  }

  updateLandingPage(page: IPage, loadPage = true): Observable<any> {
    const { langcode, nid } = page;

    let prefix = '';
    const lang = getApiLang(langcode);
    if (lang) {
      prefix = `/${lang}`;
    }
    this.builder.loading.set(true);
    return this.http
      .patch(
        `${this.apiUrl}${prefix}${LANDING_PAGE_API.update}/${nid}`,
        coverExtraData(page),
        this.optionsWithBearerToken()
      )
      .pipe(
        tap((res: any) => {
          const { status } = res;
          if (status) {
            if (loadPage && langcode && nid) {
              this.loadPage(
                {
                  langcode,
                  nid,
                },
                true
              );
            }
          } else {
            this.util.openSnackbar('保存失败，请重试', 'ok');
          }
        })
      );
  }

  getDefaultPage(url: string): Observable<IPage> {
    const { apiUrl, production } = environment;
    const pathname = window.location.pathname;
    const { lang } = this.getUrlPath(pathname);
    if (!production) {
      return this.http.get<IPage>(`${apiUrl}/assets/app${lang}${url}.json`);
    } else {
      this.builder.loading.set(true);
      // updateState=false: this content renders inside the builder; letting it
      // through updateTags() would overwrite the route's document title.
      return this.contentService.loadPageContent(`${lang}${url}`, false).pipe(
        tap(res => {
          this.builder.loading.set(false);
          if (isArray(res) || !res) {
            this.util.openSnackbar('请配置默认页面！', 'OK');
          }
        }),
        catchError(() => {
          this.builder.loading.set(false);
          this.util.openSnackbar('请配置默认页面！', 'OK');
          return of({
            title: '',
            body: [],
          });
        })
      );
    }
  }

  /**
   * Re-check whether the target-language translation already exists before submitting,
   * to avoid someone creating the same-language translation between loading the draft
   * and submitting. If the check request fails, treat it as not existing and let the
   * backend make the final call.
   */
  checkTranslationExists(nid: string | number, target: string): Observable<boolean> {
    return this.nodeService.fetch(`/api/v3/landingPage/json/${nid}`, { noCache: 1 }, target).pipe(
      map((page: IPage) => page.langcode === target),
      catchError(() => of(false))
    );
  }

  /**
   * The backend gives the new translation its own path_alias inside the same save,
   * so there is nothing left to patch up from here.
   */
  addTranslation(page: IPage): Observable<any> {
    const { nid, target, langcode } = page;
    return this.http.post(
      `${this.apiUrl}${LANDING_PAGE_API.translate}/add/${nid}/${langcode}/${target}`,
      formatPage(page),
      this.optionsWithBearerToken()
    );
  }

  /**
   * Only deletes the translation for the specified language; the source language and
   * other language versions are kept. Deleting the source language (the node itself)
   * still goes through JSON:API node deletion, which cascades to all language versions.
   */
  deleteTranslation(nid: string | number, langcode: string): Observable<any> {
    return this.http.post(
      `${this.apiUrl}${LANDING_PAGE_API.translate}/delete/${nid}/${langcode}`,
      {},
      this.optionsWithBearerToken()
    );
  }

  updateAttributes(
    page: { uuid: string; langcode?: string },
    api: string,
    attr: any,
    relationships: any
  ): Observable<any> {
    const { langcode, uuid } = page;
    let prefix = '';
    const arr = api.split('/');
    const type = `${arr[arr.length - 2]}--${arr[arr.length - 1]}`;
    const lang = getApiLang(langcode);
    if (lang) {
      prefix = `/${lang}`;
    }

    return this.http
      .patch(
        `${prefix}${api}/${uuid}`,
        {
          data: {
            type,
            id: uuid,
            attributes: {
              ...attr,
            },
            relationships: {
              ...relationships,
            },
          },
        },
        this.optionsWithBearerToken()
      )
      .pipe(
        catchError((res: any) => {
          const { status } = res;
          let message = '';
          switch (status) {
            case 403:
              message = '您没有权限执行此操作！';
              break;
            default:
              message = '未知错误';
          }
          this.util.openSnackbar(message, 'ok');
          return of(false);
        })
      );
  }

  /**
   * Write a page URL alias through the node's own `path` field.
   *
   * Writing `path_alias` entities directly also rewrote their `langcode`, which moved
   * one language's alias onto another and made Drupal delete the wrong rows when a
   * translation was removed. Going through the node keeps every alias owned by the
   * translation it belongs to, and lets core pick create vs. update from `pid`.
   *
   * Resolves `true` once the alias is written; rejects after reporting the reason, so
   * callers can abort before touching the rest of the page settings.
   */
  updateUrlalias(
    page: { uuid: string; langcode?: string; path?: INodePath },
    api: string,
    alias: string
  ): Promise<boolean> {
    const { uuid, langcode, path } = page;
    const prefix = this.apiLangPrefix(langcode);
    // The field is prefilled with the language prefix, so drop it before writing — but
    // only where it leads, or a plain replace eats the same letters out of an alias
    // that just happens to start with them, turning /enterprise into /terprise
    const cleanAlias = prefix && alias.startsWith(`${prefix}/`) ? alias.slice(prefix.length) : alias;

    return firstValueFrom(
      this.patchNodeAlias(api, uuid, cleanAlias, path, langcode).pipe(
        switchMap(() => this.syncAliasToOtherLangs(api, uuid, cleanAlias, langcode)),
        map(allSynced => {
          if (!allSynced) {
            this.util.openSnackbar(
              this.translate.instant('BUILDER.PAGE_SETTING.ALIAS_SYNC_PARTIAL_FAIL'),
              'ok'
            );
          }
          return true;
        }),
        catchError(error => {
          const { status } = error || {};
          let message = '更新页面 URL 失败，请重试';
          switch (status) {
            case 403:
              message = '无权限执行此操作';
              break;
            case 409:
            case 422:
              message = 'URL 已存在，请更换后重试';
              break;
            default:
              message = '更新页面 URL 失败，请重试';
          }
          this.util.openSnackbar(message, 'ok');
          return throwError(() => error);
        })
      )
    );
  }

  /** Language prefix used by the JSON:API endpoints; empty for the default language. */
  private apiLangPrefix(langcode?: string): string {
    const lang = getApiLang(langcode);
    return lang ? `/${lang}` : '';
  }

  /**
   * Patch the `path` field of one node translation.
   *
   * `pid` is what core reads to decide: an existing id updates that alias row, `null`
   * creates one for this language — which is exactly what a translation that never
   * had an alias needs.
   *
   * `pathauto` at 0 marks the alias as manual — the same thing unchecking "Generate
   * automatic URL alias" does. Every node the builder creates is flagged for an
   * automatic alias instead, and from then on pathauto owns the save: it drops what was
   * typed and puts its own pattern in its place, or leaves the page with no alias at all
   * where the content type has no pattern. The flag cannot be probed for, because
   * JSON:API keeps the computed property out of its responses, so it is sent by default
   * and dropped once a backend without the module rejects it.
   */
  private patchNodeAlias(
    api: string,
    uuid: string,
    alias: string,
    path: INodePath | undefined,
    langcode?: string
  ): Observable<any> {
    const arr = api.split('/');
    const type = `${arr[arr.length - 2]}--${arr[arr.length - 1]}`;
    const value: INodePath = { alias, pid: path?.pid ?? null };
    if (this.writePathautoFlag) {
      value.pathauto = 0;
    }
    return this.http
      .patch(
        `${this.apiLangPrefix(langcode)}${api}/${uuid}`,
        {
          data: {
            type,
            id: uuid,
            attributes: {
              path: value,
            },
          },
        },
        this.optionsWithBearerToken()
      )
      .pipe(
        catchError(error => {
          if (!this.writePathautoFlag || !isMissingPathautoProperty(error)) {
            return throwError(() => error);
          }
          this.writePathautoFlag = false;
          return this.patchNodeAlias(api, uuid, alias, path, langcode);
        })
      );
  }

  /**
   * Multilingual aliases differ only by the language prefix: after one language's alias
   * changes, align the other translations of the same node.
   *
   * A language without a translation is skipped — JSON:API serves a fallback there, and
   * the returned `langcode` is what gives that away. A language that does have a
   * translation but no alias row yet gets one, instead of being left on `/<lang>/node/<nid>`.
   */
  private syncAliasToOtherLangs(
    api: string,
    uuid: string,
    alias: string,
    currentLangcode?: string
  ): Observable<boolean> {
    const { multiLang, langs } = environment;
    const otherLangs = (langs ?? []).filter(lang => lang.langCode !== currentLangcode);
    if (!multiLang || !otherLangs.length) {
      return of(true);
    }
    const arr = api.split('/');
    const type = `${arr[arr.length - 2]}--${arr[arr.length - 1]}`;

    const tasks = otherLangs.map(lang => {
      const prefix = this.apiLangPrefix(lang.langCode);
      return this.http
        .get(
          appendQueryParams(
            `${prefix}${api}/${uuid}`,
            { [`fields[${type}]`]: 'langcode,path', noCache: 1 },
            { encodeKeys: false }
          )
        )
        .pipe(
          switchMap((res: any) => {
            const attributes = res?.data?.attributes;
            if (!attributes || attributes.langcode !== lang.langCode) {
              return of(true);
            }
            if (attributes.path?.alias === alias) {
              return of(true);
            }
            return this.patchNodeAlias(api, uuid, alias, attributes.path, lang.langCode).pipe(
              map(() => true)
            );
          }),
          catchError(() => of(false))
        );
    });

    return forkJoin(tasks).pipe(map(results => results.every(Boolean)));
  }

  openPageSetting(
    page: { uuid: string; langcode?: string },
    api: string,
    params: QueryParams | string
  ): void {
    const { uuid, langcode } = page;
    const lang = getApiLang(langcode);
    this.nodeService
      .fetch(`${api}/${uuid}`, params, lang)
      .pipe(
        catchError((error: any) => {
          const { statusText } = error;
          this.util.openSnackbar(statusText, 'ok');
          return of(false);
        }),
        take(1)
      )
      .subscribe(res => {
        if (res) {
          this.builder.rightContent$.next({
            title: '页面配置',
            mode: 'over',
            hasBackdrop: true,
            style: {
              padding: '14px',
              'max-width': 'calc(100vw - 80px)',
            },
            elements: [
              {
                type: 'page-setting',
                content: res,
                fullWidth: true,
              },
            ],
          });
        }
        this.builder.loading.set(false);
      });
  }

  addBlock(addType: string, content: any, path: string): void {
    this.builder.rightContent$.next({
      title: '选择组件',
      mode: 'over',
      hasBackdrop: false,
      style: {
        width: '400px',
      },
      elements: [
        {
          type: 'widget-picker',
          addType,
          path,
          content,
          fullWidth: true,
        },
      ],
    });
  }
}
