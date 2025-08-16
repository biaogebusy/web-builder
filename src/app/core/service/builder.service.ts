import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { BUILDER_CONFIG, USER } from '@core/token/token-providers';
import type { IPage, IPageForJSONAPI } from '@core/interface/IAppConfig';
import { Observable, Subject, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import type { IUser } from '@core/interface/IUser';
import { UtilitiesService } from './utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import { NodeService } from './node.service';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DrupalJsonApiParams } from 'drupal-jsonapi-params';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { ContentService } from './content.service';
import { isArray } from 'lodash-es';
import { IBuilderConfig } from '@core/interface/IBuilder';
import { createPopper } from '@popperjs/core';
import { IDialog } from '@core/interface/IDialog';
import { IJsoneditor } from '@core/interface/widgets/IJsoneditor';

@Injectable({
  providedIn: 'root',
})
export class BuilderService extends ApiService {
  private user$ = inject<Observable<IUser>>(USER);
  private builderConfig$ = inject<Observable<IBuilderConfig>>(BUILDER_CONFIG);

  private http = inject(HttpClient);
  private dialog = inject(MatDialog);
  private builder = inject(BuilderState);
  private util = inject(UtilitiesService);
  private nodeService = inject(NodeService);
  private contentService = inject(ContentService);
  private user: IUser;
  private builderConfig: IBuilderConfig;

  constructor() {
    super();
    this.user$.subscribe(user => {
      this.user = user;
    });
    this.builderConfig$.subscribe(config => {
      this.builderConfig = config;
    });
  }

  getApiLang(langcode?: string): string {
    const { langs } = environment;
    let lang = '';
    if (langs && langcode && langs.length > 0) {
      const defaultLang = langs.find(item => item.default === true);
      lang = defaultLang?.langCode === langcode ? '' : langcode;
    }

    return lang;
  }

  getPageParams(include: string[]): string {
    const apiParams = new DrupalJsonApiParams();
    apiParams.addCustomParam({ noCache: true });
    apiParams.addInclude(include);
    const params = apiParams.getQueryString();

    return params;
  }

  loadPage(
    page: { langcode?: string; nid: string; isTemplate?: boolean },
    openSetting = false
  ): void {
    const { langcode, nid, isTemplate } = page;
    const lang = this.getApiLang(langcode);
    this.nodeService
      .fetch(`/api/v3/landingPage/json/${nid}`, 'noCache=1', '', lang)
      .subscribe((content: IPage) => {
        const { body, status, uuid, title } = content;
        this.builder.loading$.next(false);
        if (status) {
          this.builder.loadNewPage(this.formatToExtraData(content, isTemplate));
          this.util.openSnackbar(`已加载${content.title}`, 'ok');
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

            dialogRef.afterClosed().subscribe(result => {
              if (result && uuid) {
                this.openPageSetting(
                  { uuid, langcode },
                  '/api/v1/node/landing_page',
                  this.getPageParams(['uid', 'group', 'cover', 'cover.field_media_image'])
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
    const lang = this.getApiLang(langcode);
    this.nodeService
      .fetch(`/api/v3/landingPage/json/${nid}`, 'noCache=1', '', lang)
      .subscribe((content: IPage) => {
        const { status, uuid } = content;
        if (status) {
          const jsonWidget: IJsoneditor = {
            type: 'jsoneditor',
            data: this.formatToExtraData(content),
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
    if (!checkPage) {
      return;
    }
    const { langcode, nid, changed, uuid, title } = checkPage;
    if (nid && changed && uuid) {
      const lang = this.getApiLang(langcode);
      this.nodeService
        .fetch(`/api/v3/landingPage/json/${nid}`, 'noCache=1', '', lang)
        .subscribe((page: IPage) => {
          if (Number(changed) < Number(page.changed)) {
            const config: IDialog = {
              title: `当前页面不是最新版本`,
              titleClasses: 'text-red-500',
              yesLabel: '确认更新',
              noLabel: '取消',
              inputData: {
                content: {
                  type: 'text',
                  fullWidth: true,
                  body: `是否要拉取<strong class="text-black-500">[${title}]</strong>最新的更新覆盖当前页面？`,
                },
              },
            };
            const dialogRef = this.dialog.open(DialogComponent, {
              width: '340px',
              data: config,
            });

            dialogRef.afterClosed().subscribe(result => {
              if (result) {
                this.builder.loadNewPage(this.formatToExtraData(page));
              }
            });
          }
        });
    }
  }

  loadNodeJson(page: { langcode?: string; nid: string; uuid: string; schemaType: string }): void {
    this.builder.loading$.next(true);
    const { langcode, nid, uuid, schemaType } = page;
    const lang = this.getApiLang(langcode);
    this.nodeService
      .fetch(`/api/v3/landingPage?content=/node/${nid}`, 'noCache=1', '', lang)
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
                reqRoles: ['administrator'],
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
        this.builder.loading$.next(false);
        this.dialog.open(DialogComponent, {
          width: '1000px',
          panelClass: ['close-outside', 'close-icon-white'],
          data: config,
        });
      });
  }

  createLandingPage(page: IPage, loadPage = true): Observable<any> {
    const {
      api: { create },
    } = this.builderConfig;
    const { csrf_token } = this.user;
    this.builder.loading$.next(true);
    return this.http
      .post(
        `${this.apiUrl}${create}`,
        this.formatPage(page),
        this.optionsWithCookieAndToken(csrf_token)
      )
      .pipe(
        tap((res: any) => {
          const {
            data: { nid },
          } = res;
          if (loadPage) {
            this.loadPage({ nid }, true);
          }
        })
      );
  }

  updateLandingPage(page: IPage): Observable<any> {
    const { langcode, nid } = page;

    let prefix = '';
    const lang = this.getApiLang(langcode);
    if (lang) {
      prefix = `/${lang}`;
    }
    const {
      api: { update },
    } = this.builderConfig;
    const { csrf_token } = this.user;
    this.builder.loading$.next(true);
    return this.http
      .patch(
        `${this.apiUrl}${prefix}${update}/${nid}`,
        this.coverExtraData(page),
        this.optionsWithCookieAndToken(csrf_token)
      )
      .pipe(
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
      this.builder.loading$.next(true);
      return this.contentService.loadPageContent(`${lang}${url}`).pipe(
        tap(res => {
          this.builder.loading$.next(false);
          if (isArray(res) || !res) {
            this.util.openSnackbar('请配置默认页面！', 'OK');
          }
        }),
        catchError(() => {
          this.builder.loading$.next(false);
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
    const {
      api: { translate },
    } = this.builderConfig;
    const { csrf_token } = this.user;
    return this.http.post(
      `${this.apiUrl}${translate}/add/${nid}/${langcode}/${target}`,
      this.formatPage(page),
      this.optionsWithCookieAndToken(csrf_token)
    );
  }

  updateAttributes(
    page: { uuid: string; langcode?: string },
    api: string,
    attr: any,
    relationships: any
  ): Observable<any> {
    const { csrf_token } = this.user;
    const { langcode, uuid } = page;
    let prefix = '';
    const arr = api.split('/');
    const type = `${arr[arr.length - 2]}--${arr[arr.length - 1]}`;
    const lang = this.getApiLang(langcode);
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
        this.optionsWithCookieAndToken(csrf_token)
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

  getAttrAlias(attr: any): string {
    const {
      drupal_internal__nid,
      langcode,
      path: { alias },
    } = attr;

    const lang = this.getApiLang(langcode);
    const url = alias ? `${lang}${alias}` : `${lang}/node/${drupal_internal__nid}`;
    return lang ? `/${url}` : url;
  }

  updateUrlalias(
    page: { langcode?: string; id: string; path: any },
    alias: string
  ): Observable<any> {
    const { multiLang } = environment;
    const { csrf_token } = this.user;
    const {
      langcode,
      id,
      path: { pid },
    } = page;

    let prefix = '';
    const lang = this.getApiLang(langcode);
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

    const status$ = new Subject<any>();
    if (pid) {
      this.http
        .get(`${prefix}/api/v1/path_alias/path_alias?filter[drupal_internal__id]=${pid}`)
        .subscribe((res: any) => {
          const { data } = res;
          const uuid = data[0].id;
          this.http
            .patch(
              `${prefix}/api/v1/path_alias/path_alias/${uuid}`,
              {
                data: {
                  ...paramsData,
                  id: uuid,
                },
              },
              this.optionsWithCookieAndToken(csrf_token)
            )
            .pipe(
              catchError(() => {
                return of(false);
              })
            )
            .subscribe(status => {
              status$.next(status);
            });
        });
    } else {
      this.http
        .post(
          `${prefix}/api/v1/path_alias/path_alias`,
          {
            data: paramsData,
          },
          this.optionsWithCookieAndToken(csrf_token)
        )
        .pipe(
          catchError(() => {
            return of(false);
          })
        )
        .subscribe(res => {
          status$.next(res);
        });
    }

    return status$;
  }

  formatPage(page: IPage): IPageForJSONAPI {
    const currentPage: IPage = { ...page };
    currentPage.body = page.body.map(item => {
      return {
        type: 'json',
        attributes: {
          body: item,
        },
      };
    });
    return currentPage;
  }

  openPageSetting(page: { uuid: string; langcode?: string }, api: string, params: string): void {
    const { uuid, langcode } = page;
    const lang = this.getApiLang(langcode);
    this.nodeService
      .fetch(`${api}/${uuid}`, params, this.user.csrf_token, lang)
      .pipe(
        catchError((error: any) => {
          const { statusText } = error;
          this.util.openSnackbar(statusText, 'ok');
          return of(false);
        })
      )
      .subscribe(res => {
        if (res) {
          this.builder.rightContent$.next({
            title: '页面配置',
            mode: 'over',
            hasBackdrop: true,
            style: {
              'width': '300px',
              'padding': '14px',
              'max-width': 'calc(100vw - 50px)',
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
        this.builder.loading$.next(false);
      });
  }

  coverExtraData(page: IPage): any {
    const currentPage: IPage = { ...page };
    currentPage.label = page.title;
    currentPage.body = page.body.map(item => {
      if (item.extra) {
        // 修改已有组件
        const { uuid, id, type } = item.extra;
        return {
          uuid,
          id,
          type,
          attributes: {
            body: item,
          },
        };
      } else {
        // 新增组件
        return {
          type: 'json',
          attributes: {
            body: item,
          },
        };
      }
    });

    return currentPage;
  }

  formatToExtraData(page: IPage, isTemplate?: boolean): IPage {
    if (isTemplate) {
      return {
        title: this.getTitle(page.title),
        current: true,
        time: new Date(),
        body: this.initExtraBody(page.body, true),
      };
    } else {
      return {
        ...page,
        title: this.getTitle(page.title),
        body: this.initExtraBody(page.body),
      };
    }
  }

  getTitle(title: string): string {
    // api respone title with site name, need remove;
    const index = title.indexOf('|');
    let pageTitle = '';
    if (index !== -1) {
      pageTitle = title.substring(0, index).trim();
    } else {
      pageTitle = title;
    }

    return pageTitle;
  }

  addBlock(addType: string, content: any, path: string, target: any): void {
    const popper = document.querySelector('.widget-picker') as HTMLElement;
    this.builder.widgetsPicker$.next({
      type: 'widget-picker',
      addType,
      path,
      content,
    });
    if (popper) {
      createPopper(target, popper, {
        strategy: 'fixed',
        placement: 'right',
      });
    }
  }

  initExtraBody(body: any[], isTemplate?: boolean): any[] {
    let components = [];
    if (body.length) {
      components = body.map(item => {
        if (isTemplate) {
          return {
            ...item.attributes.body,
          };
        } else {
          return {
            extra: {
              uuid: item.uuid,
              id: item.id,
              type: item.type,
            },
            ...item.attributes.body,
          };
        }
      });
    } else {
      components = [
        {
          type: 'text',
          title: {
            label:
              '<p style="display: inline-block; margin-bottom: 0px;">使用开源 <strong class="text-primary">Web Builder</strong> 快速构建页面</p>',
            style: 'style-v1',
            classes: 'mat-headline-3 bold',
          },
          bg: {
            classes: '',
          },
          body: '信使UI是基于 Material 的 Angular 前端框架， 五十多个丰富的组件可提供优秀的数字创新体验，使用 Web Builder 可以通过拖拽快速构建响应式、多主题的 Web 页面。Builder 与众不同的是它完全融入到了 <strong class="text-primary">Storybook</strong> 当中，它是一个面向UI组件开发的工具，提供了组件驱动的开发方式、交互式展示和测试界面，以及文档化功能。',
          classes: 'text-center',
          actionsAlign: 'center',
          actions: [
            {
              type: 'btn',
              color: 'primary',
              mode: 'stroked',
              label: '演示视频',
              href: 'https://www.bilibili.com/video/BV1ux4y197kc/?spm_id_from=333.999.0.0&vd_source=f65b4e2d70ecc450290b6b1710c0ada5',
              target: '_blank',
              icon: {
                inline: true,
                svg: 'play-circle-outline',
              },
            },
          ],
        },
      ];
    }

    return components;
  }
}
