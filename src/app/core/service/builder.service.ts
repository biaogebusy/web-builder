import { DestroyRef, Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ApiService } from './api.service';
import type { IPage } from '@core/interface/IAppConfig';
import { Observable, of, Subscription, timer } from 'rxjs';
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
import {
  coverExtraData,
  formatPage,
  formatToExtraData,
  getApiLang,
  getPageParams,
} from '@core/util/builder-page.util';
import { appendQueryParams, type QueryParams } from '@core/util/http-params.util';

const BUILDERPATH = '/builder';
const VERSION_KEY = 'version';
const VERSION_CHECK_INTERVAL = 30000;

@Injectable({
  providedIn: 'root',
})
export class BuilderService extends ApiService {
  private dialog = inject(MatDialog);
  private builder = inject(BuilderState);
  private util = inject(UtilitiesService);
  private nodeService = inject(NodeService);
  private contentService = inject(ContentService);
  private builderConfig$ = this.contentService.loadBuilderConfig();
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  private storage = inject(LocalStorageService);
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
      .subscribe((content: IPage) => {
        const { body, status, uuid } = content;
        this.builder.loading.set(false);
        if (status) {
          this.builder.loadNewPage(formatToExtraData(content, isTemplate));
          if (isTemplate) {
            this.util.openSnackbar(`已复制${content.title}`, 'ok');
          } else {
            this.util.openSnackbar(`已加载${content.title}`, 'ok');
          }
          if (openSetting) {
            const config: IDialog = {
              title: '页面属性',
              noLabel: '取消',
              yesLabel: '确认',
              inputData: {
                content: {
                  type: 'text',
                  fullWidth: true,
                  body: `是否需要打开页面属性面板？`,
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
            this.util.openSnackbar('当前内容为空，已为你初始化一个组件', 'ok');
          }
        } else {
          this.util.openSnackbar('该页面非builder创建，请到后台编辑', 'ok');
        }
      });
  }

  loadPageJSON(page: { langcode?: string; nid: string }): void {
    const { langcode, nid } = page;
    const lang = getApiLang(langcode);
    this.nodeService
      .fetch(`/api/v3/landingPage/json/${nid}`, { noCache: 1 }, lang)
      .pipe(take(1))
      .subscribe((content: IPage) => {
        const { status, uuid } = content;
        if (status) {
          const jsonWidget: IJsoneditor = {
            type: 'jsoneditor',
            data: formatToExtraData(content),
            classes: 'full-height',
            isSetting: true,
            schemaType: 'page',
            fullWidth: true,
            actions: [
              {
                type: 'update',
                label: '更新JSON',
                params: {
                  uuid,
                  langcode,
                  api: '/api/v1/node/landing_page',
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
    return this.builderConfig$.pipe(
      take(1),
      switchMap(({ api: { create } }) =>
        this.http.post(`${this.apiUrl}${create}`, formatPage(page), this.optionsWithBearerToken())
      ),
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

  updateLandingPage(page: IPage): Observable<any> {
    const { langcode, nid } = page;

    let prefix = '';
    const lang = getApiLang(langcode);
    if (lang) {
      prefix = `/${lang}`;
    }
    this.builder.loading.set(true);
    return this.builderConfig$.pipe(
      take(1),
      switchMap(({ api: { update } }) =>
        this.http.patch(
          `${this.apiUrl}${prefix}${update}/${nid}`,
          coverExtraData(page),
          this.optionsWithBearerToken()
        )
      ),
      tap((res: any) => {
        const { status } = res;
        if (status) {
          if (langcode && nid) {
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

  addTranslation(page: IPage): Observable<any> {
    const { nid, target, langcode } = page;
    return this.builderConfig$.pipe(
      take(1),
      switchMap(({ api: { translate } }) =>
        this.http.post(
          `${this.apiUrl}${translate}/add/${nid}/${langcode}/${target}`,
          formatPage(page),
          this.optionsWithBearerToken()
        )
      )
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
      const paramsData = {
        type: 'path_alias--path_alias',
        attributes: {
          alias: alias.replace(prefix, ''),
          path: `/node/${id}`,
          ...langObj,
        },
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
                  resolve(true);
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
              resolve(true);
            } else {
              reject(false);
            }
          });
      }
    });
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
