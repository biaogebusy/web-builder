import { Inject, Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { CORE_CONFIG, USER } from '@core/token/token-providers';
import type { ICoreConfig, IPage, IPageForJSONAPI } from '@core/interface/IAppConfig';
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

@Injectable({
  providedIn: 'root',
})
export class BuilderService extends ApiService {
  http = inject(HttpClient);
  dialog = inject(MatDialog);
  builder = inject(BuilderState);
  util = inject(UtilitiesService);
  nodeService = inject(NodeService);
  contentService = inject(ContentService);
  user: IUser;
  constructor(
    @Inject(CORE_CONFIG) private coreConfig: ICoreConfig,
    @Inject(USER) private user$: Observable<IUser>
  ) {
    super();
    this.user$.subscribe(user => {
      this.user = user;
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

  loadPage(page: { langcode?: string; nid: string; isTemplate?: boolean }): void {
    const { langcode, nid, isTemplate } = page;
    const lang = this.getApiLang(langcode);
    this.nodeService
      .fetch(`/api/v3/landingPage/json/${nid}`, 'noCache=1', '', lang)
      .subscribe((page: IPage) => {
        const { body, status, uuid } = page;
        this.builder.loading$.next(false);
        if (status) {
          this.builder.loadNewPage(this.formatToExtraData(page, isTemplate));
          if (uuid && !isTemplate) {
            this.openPageSetting(
              {
                uuid,
                langcode,
              },
              '/api/v1/node/landing_page',
              this.getPageParams(['uid', 'group', 'cover', 'cover.field_media_image'])
            );
          }

          if (body.length === 0) {
            this.util.openSnackbar('当前内容为空，已为你初始化一个组件', 'ok');
          }
        } else {
          this.util.openSnackbar('该页面非builder创建，请到后台编辑', 'ok');
        }
      });
  }

  checkIsLatestPage(page: IPage): void {
    const { langcode, nid, changed, uuid, title } = page;
    if (nid && changed && uuid) {
      const lang = this.getApiLang(langcode);
      this.nodeService
        .fetch(`/api/v3/landingPage/json/${nid}`, 'noCache=1', '', lang)
        .subscribe((page: IPage) => {
          console.log(page);
          if (Number(changed) < Number(page.changed)) {
            this.util.openSnackbar(`当前${title}页面不是最新版本！`, 'ok');
          }
        });
    }
  }

  loadNodeJson(page: { langcode?: string; nid: string; uuid: string }): void {
    this.builder.loading$.next(true);
    const { langcode, nid, uuid } = page;
    const lang = this.getApiLang(langcode);
    this.nodeService
      .fetch(`/api/v3/landingPage?content=/node/${nid}`, 'noCache=1', '', lang)
      .subscribe((page: any) => {
        this.builder.loading$.next(false);
        this.dialog.open(DialogComponent, {
          width: '1000px',
          panelClass: ['close-outside', 'close-icon-white'],
          data: {
            disableCloseButton: true,
            inputData: {
              content: {
                type: 'jsoneditor',
                data: page,
                isSetting: true,
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
              },
            },
          },
        });
      });
  }

  createLandingPage(page: IPage): Observable<any> {
    const {
      builder: {
        api: { create },
      },
    } = this.coreConfig;
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
          this.loadPage({ nid });
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
      builder: {
        api: { update },
      },
    } = this.coreConfig;
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
              this.loadPage({
                langcode,
                nid,
              });
            }
          } else {
            this.util.openSnackbar('保存失败，请重试', 'ok');
          }
        })
      );
  }

  getDefaultPage(): Observable<IPage> {
    const { apiUrl, production } = environment;
    const pathname = window.location.pathname;
    const { lang } = this.getUrlPath(pathname);
    if (!production) {
      return this.http.get<IPage>(`${apiUrl}/assets/app${lang}/builder/default-page.json`);
    } else {
      this.builder.loading$.next(true);
      return this.contentService.loadPageContent(`${lang}/builder/default-page`).pipe(
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
      builder: {
        api: { translate },
      },
    } = this.coreConfig;
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
    type: string,
    attr: any,
    relationships: any
  ): Observable<any> {
    const { csrf_token } = this.user;
    const { langcode, uuid } = page;
    let prefix = '';
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
          console.log(res);
          const {
            error: { errors },
          } = res;
          this.util.openSnackbar(errors[0].detail, 'ok');
          return throwError(errors[0]);
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
    this.nodeService.fetch(`${api}/${uuid}`, params, this.user.csrf_token, lang).subscribe(
      res => {
        this.builder.loading$.next(false);
        this.builder.rightContent$.next({
          mode: 'over',
          hasBackdrop: true,
          style: {
            'width': '260px',
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
      },
      error => {
        this.builder.loading$.next(false);
        const { statusText } = error;
        this.util.openSnackbar(statusText, 'ok');
      }
    );
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

  addBlock(addType: string, content: any, path: string): void {
    this.builder.rightContent$.next({
      mode: 'over',
      hasBackdrop: false,
      style: {
        width: '308px',
      },
      elements: [
        {
          type: 'widget-picker',
          addType,
          path,
          content,
        },
      ],
    });
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
            classes: 'bg- bg-fill-width',
          },
          body: '信使UI是基于 Material 的 Angular 前端框架， 五十多个丰富的组件可提供优秀的数字创新体验，使用 Web Builder 可以通过拖拽快速构建响应式、多主题的 Web 页面。Builder 与众不同的是它完全融入到了 <strong class="text-primary">Storybook</strong> 当中，它是一个面向UI组件开发的工具，提供了组件驱动的开发方式、交互式展示和测试界面，以及文档化功能。',
          classes: 'text-center',
          actionsAlign: 'center',
          actions: [
            {
              type: 'btn-generater',
              label: '生成页面',
              color: 'primary',
              mode: 'raised',
            },
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
