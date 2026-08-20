import { DestroyRef, Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ApiService } from './api.service';
import type { IPage } from '@core/interface/IAppConfig';
import { forkJoin, Observable, of, Subscription, timer } from 'rxjs';
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
   * Load one revision into the local draft. The payload reports the *current* revision id and
   * changed time, so the following save still commits on top of the latest revision instead of
   * being rejected as stale.
   */
  loadPageRevision(page: { langcode?: string; nid: string; vid: string }): void {
    const { langcode, nid, vid } = page;
    this.builder.loading.set(true);
    this.nodeService
      .fetch(`/api/v3/landingPage/revisions/${nid}/${vid}`, { noCache: 1 }, getApiLang(langcode))
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
          this.builder.loadNewPage({ ...formatToExtraData(content), dirty: true });
          this.util.openSnackbar(this.translate.instant('BUILDER.REVISION.LOADED', { vid }), 'ok');
        },
        error: () => {
          this.builder.loading.set(false);
          this.util.openSnackbar(this.translate.instant('BUILDER.REVISION.LOAD_FAIL'), 'ok');
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
      return this.contentService.loadPageContent(`${lang}${url}`).pipe(
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

  addTranslation(page: IPage): Observable<any> {
    const { nid, target, langcode } = page;
    return this.http
      .post(
        `${this.apiUrl}${LANDING_PAGE_API.translate}/add/${nid}/${langcode}/${target}`,
        formatPage(page),
        this.optionsWithBearerToken()
      )
      .pipe(
        switchMap((res: any) => {
          if (!res?.status || !nid || !target) {
            return of(res);
          }
          return this.copyAliasToLang(nid, langcode, target).pipe(
            map(synced => {
              if (!synced) {
                this.util.openSnackbar(
                  this.translate.instant('BUILDER.PAGE_SETTING.TRANSLATION_ALIAS_SYNC_FAIL'),
                  'ok'
                );
              }
              return res;
            })
          );
        })
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

  /**
   * After creating a translation, copy the source language's path_alias to the target
   * language so the translated page URL differs from the default page only by the
   * language prefix.
   */
  private copyAliasToLang(
    nid: string | number,
    sourceLangcode: string | undefined,
    targetLangcode: string
  ): Observable<boolean> {
    if (!environment.multiLang) {
      return of(true);
    }
    const srcApiLang = getApiLang(sourceLangcode);
    const srcPrefix = srcApiLang ? `/${srcApiLang}` : '';
    const tgtApiLang = getApiLang(targetLangcode);
    const tgtPrefix = tgtApiLang ? `/${tgtApiLang}` : '';
    const queryAlias = (prefix: string, lang?: string): Observable<any> =>
      this.http.get(
        appendQueryParams(
          `${prefix}/api/v1/path_alias/path_alias`,
          {
            'filter[path]': `/node/${nid}`,
            ...(lang ? { 'filter[langcode]': lang } : {}),
          },
          { encodeKeys: false }
        )
      );

    return queryAlias(srcPrefix, sourceLangcode).pipe(
      switchMap((srcRes: any) => {
        const source = srcRes?.data?.[0];
        if (!source) {
          // Source page has no alias, nothing to sync
          return of(true);
        }
        const alias = source.attributes?.alias;
        return queryAlias(tgtPrefix, targetLangcode).pipe(
          switchMap((tgtRes: any) => {
            const record = tgtRes?.data?.[0];
            if (record?.attributes?.alias === alias) {
              return of(true);
            }
            const attributes = {
              alias,
              path: `/node/${nid}`,
              langcode: targetLangcode,
            };
            if (record) {
              return this.http
                .patch(
                  `${tgtPrefix}/api/v1/path_alias/path_alias/${record.id}`,
                  {
                    data: {
                      type: 'path_alias--path_alias',
                      id: record.id,
                      attributes,
                    },
                  },
                  this.optionsWithBearerToken()
                )
                .pipe(map(() => true));
            }
            return this.http
              .post(
                `${tgtPrefix}/api/v1/path_alias/path_alias`,
                {
                  data: {
                    type: 'path_alias--path_alias',
                    attributes,
                  },
                },
                this.optionsWithBearerToken()
              )
              .pipe(map(() => true));
          })
        );
      }),
      catchError(() => of(false))
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

  updateUrlalias(
    page: { langcode?: string; id: string; path: any },
    alias: string
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const { multiLang } = environment;
      const {
        langcode,
        id,
        path: { pid },
      } = page;

      const handleError = (error: any): false => {
        const { status } = error || {};
        let message = '更新页面 URL 失败，请重试';
        switch (status) {
          case 403:
            message = '无权限执行此操作';
            break;
          case 409:
            message = 'URL 已存在，请更换后重试';
            break;
          default:
            message = '更新页面 URL 失败，请重试';
        }
        this.util.openSnackbar(message, 'ok');
        return false;
      };

      let prefix = '';
      const lang = getApiLang(langcode);
      if (lang) {
        prefix = `/${lang}`;
      }
      let langObj = {};
      if (multiLang) {
        langObj = {
          langcode: langcode ?? 'und',
        };
      }
      const cleanAlias = alias.replace(prefix, '');
      const paramsData = {
        type: 'path_alias--path_alias',
        attributes: {
          alias: cleanAlias,
          path: `/node/${id}`,
          ...langObj,
        },
      };

      const syncAndResolve = (): void => {
        this.syncAliasToOtherLangs(id, cleanAlias, langcode)
          .pipe(take(1))
          .subscribe(allSynced => {
            if (!allSynced) {
              this.util.openSnackbar(
                this.translate.instant('BUILDER.PAGE_SETTING.ALIAS_SYNC_PARTIAL_FAIL'),
                'ok'
              );
            }
            resolve(true);
          });
      };

      if (pid) {
        this.http
          .get(
            appendQueryParams(
              `${prefix}/api/v1/path_alias/path_alias`,
              { 'filter[drupal_internal__id]': pid },
              { encodeKeys: false }
            )
          )
          .pipe(
            catchError(error => {
              return of(handleError(error));
            }),
            take(1)
          )
          .subscribe((res: any) => {
            if (!res || !res.data || !res.data.length) {
              this.util.openSnackbar('未找到可更新的 URL 记录', 'ok');
              reject(false);
              return;
            }

            const uuid = res.data[0].id;
            this.http
              .patch(
                `${prefix}/api/v1/path_alias/path_alias/${uuid}`,
                {
                  data: {
                    ...paramsData,
                    id: uuid,
                  },
                },
                this.optionsWithBearerToken()
              )
              .pipe(
                catchError(error => {
                  return of(handleError(error));
                }),
                take(1)
              )
              .subscribe(status => {
                if (status) {
                  syncAndResolve();
                } else {
                  reject(false);
                }
              });
          });
      } else {
        this.http
          .post(
            `${prefix}/api/v1/path_alias/path_alias`,
            {
              data: paramsData,
            },
            this.optionsWithBearerToken()
          )
          .pipe(
            catchError(error => {
              return of(handleError(error));
            }),
            take(1)
          )
          .subscribe(res => {
            if (res) {
              syncAndResolve();
            } else {
              reject(false);
            }
          });
      }
    });
  }

  /**
   * Multilingual aliases differ only by the language prefix: once the default-language
   * alias is updated, sync existing path_alias records of the same node in other
   * languages to the same alias.
   */
  private syncAliasToOtherLangs(
    id: string,
    alias: string,
    currentLangcode?: string
  ): Observable<boolean> {
    const { multiLang, langs } = environment;
    const otherLangs = (langs ?? []).filter(lang => lang.langCode !== currentLangcode);
    if (!multiLang || !otherLangs.length) {
      return of(true);
    }

    const tasks = otherLangs.map(lang => {
      const apiLang = getApiLang(lang.langCode);
      const prefix = apiLang ? `/${apiLang}` : '';
      return this.http
        .get(
          appendQueryParams(
            `${prefix}/api/v1/path_alias/path_alias`,
            {
              'filter[path]': `/node/${id}`,
              'filter[langcode]': lang.langCode,
            },
            { encodeKeys: false }
          )
        )
        .pipe(
          switchMap((res: any) => {
            const record = res?.data?.[0];
            if (!record || record.attributes?.alias === alias) {
              return of(true);
            }
            return this.http
              .patch(
                `${prefix}/api/v1/path_alias/path_alias/${record.id}`,
                {
                  data: {
                    type: 'path_alias--path_alias',
                    id: record.id,
                    attributes: {
                      alias,
                      path: `/node/${id}`,
                      langcode: lang.langCode,
                    },
                  },
                },
                this.optionsWithBearerToken()
              )
              .pipe(map(() => true));
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
