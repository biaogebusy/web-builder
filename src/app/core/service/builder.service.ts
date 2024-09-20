import { Inject, Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { API_URL, CORE_CONFIG, USER } from '@core/token/token-providers';
import type {
  ICoreConfig,
  IPage,
  IPageForJSONAPI,
} from '@core/interface/IAppConfig';
import { Observable, Subject, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import type { IUser } from '@core/interface/IUser';
import { UtilitiesService } from './utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import { NodeService } from './node.service';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DrupalJsonApiParams } from 'drupal-jsonapi-params';

@Injectable({
  providedIn: 'root',
})
export class BuilderService extends ApiService {
  http = inject(HttpClient);
  util = inject(UtilitiesService);
  builder = inject(BuilderState);
  nodeService = inject(NodeService);
  user: IUser;
  constructor(
    @Inject(API_URL) public apiBaseUrl: string,
    @Inject(CORE_CONFIG) private coreConfig: ICoreConfig,
    @Inject(USER) private user$: Observable<IUser>,
  ) {
    super(apiBaseUrl);
    this.user$.subscribe((user) => {
      this.user = user;
    });
  }

  getApiLang(langcode?: string): string {
    const { langs } = environment;
    let lang = '';
    if (langs && langcode && langs.length > 0) {
      const defaultLang = langs.find((item) => item.default === true);
      lang = defaultLang?.langCode === langcode ? '' : langcode;
    }

    return lang;
  }

  loadPage(page: { langcode?: string; id: string }): void {
    const { langcode, id } = page;
    const lang = this.getApiLang(langcode);
    this.nodeService
      .fetch(`/api/v3/landingPage/json/${id}`, 'noCache=1', '', lang)
      .subscribe((page: IPage) => {
        const { body, status, uuid } = page;
        this.builder.loading$.next(false);
        if (status) {
          this.builder.loadNewPage(this.formatToExtraData(page));
          if (uuid) {
            this.openPageSetting({
              uuid,
              langcode,
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
        this.optionsWithCookieAndToken(csrf_token),
      )
      .pipe(
        tap((res: any) => {
          const {
            data: { id },
          } = res;
          this.loadPage({ id });
        }),
      );
  }

  updateLandingPage(page: IPage): Observable<any> {
    const { langcode, id } = page;

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
        `${this.apiUrl}${prefix}${update}/${id}`,
        this.coverExtraData(page),
        this.optionsWithCookieAndToken(csrf_token),
      )
      .pipe(
        tap((res: any) => {
          const { status } = res;
          if (status) {
            if (langcode && id) {
              this.loadPage({
                langcode,
                id,
              });
            }
          } else {
            this.util.openSnackbar('保存失败，请重试', 'ok');
          }
        }),
      );
  }

  addTranslation(page: IPage): Observable<any> {
    const { id, target, langcode } = page;
    const {
      builder: {
        api: { translate },
      },
    } = this.coreConfig;
    const { csrf_token } = this.user;
    return this.http.post(
      `${this.apiUrl}${translate}/add/${id}/${langcode}/${target}`,
      this.formatPage(page),
      this.optionsWithCookieAndToken(csrf_token),
    );
  }

  updateAttributes(
    page: { uuid: string; langcode?: string },
    api: string,
    type: string,
    attr: any,
    relationships: any,
  ): Observable<any> {
    const { csrf_token, id } = this.user;
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
        this.optionsWithCookieAndToken(csrf_token),
      )
      .pipe(
        catchError((res: any) => {
          console.log(res);
          const {
            error: { errors },
          } = res;
          this.util.openSnackbar(errors[0].detail, 'ok');
          return throwError(errors[0]);
        }),
      );
  }

  getAttrAlias(attr: any): string {
    const {
      drupal_internal__nid,
      langcode,
      path: { alias },
    } = attr;

    const lang = this.getApiLang(langcode);
    const url = alias
      ? `${lang}${alias}`
      : `${lang}/node/${drupal_internal__nid}`;
    return url;
  }

  updateUrlalias(
    page: { langcode?: string; uuid: string; id: string },
    alias: string,
  ): Observable<any> {
    const { multiLang } = environment;
    const { csrf_token } = this.user;
    const { langcode, uuid, id } = page;

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
    const data = {
      type: 'path_alias--path_alias',
      id: uuid,
      attributes: {
        alias: alias.replace(prefix, ''),
        path: `/node/${id}`,
        ...langObj,
      },
    };

    const status$ = new Subject<any>();
    this.http
      .patch(
        `${prefix}/api/v1/path_alias/path_alias/${uuid}`,
        {
          data,
        },
        this.optionsWithCookieAndToken(csrf_token),
      )
      .pipe(
        catchError((res: any) => {
          const {
            error: { errors },
          } = res;
          return of(errors[0].status);
        }),
      )
      .subscribe((status) => {
        if (status === '404') {
          this.http
            .post(
              `${prefix}/api/v1/path_alias/path_alias`,
              {
                data,
              },
              this.optionsWithCookieAndToken(csrf_token),
            )
            .subscribe((res) => {
              status$.next(res);
            });
        } else {
          status$.next(status);
        }
      });

    return status$;
  }

  formatPage(page: IPage): IPageForJSONAPI {
    const currentPage: IPage = { ...page };
    currentPage.body = page.body.map((item) => {
      return {
        type: 'json',
        attributes: {
          body: item,
        },
      };
    });
    return currentPage;
  }

  openPageSetting(page: { uuid: string; langcode?: string }): void {
    const { uuid, langcode } = page;
    const apiParams = new DrupalJsonApiParams();
    apiParams.addCustomParam({ noCache: true });
    apiParams.addInclude(['uid', 'group', 'cover', 'cover.field_media_image']);
    const params = apiParams.getQueryString();
    const lang = this.getApiLang(langcode);
    this.nodeService
      .fetch(
        `/api/v1/node/landing_page/${uuid}`,
        params,
        this.user.csrf_token,
        lang,
      )
      .subscribe(
        (res) => {
          this.builder.loading$.next(false);
          this.builder.rightContent$.next({
            mode: 'over',
            hasBackdrop: true,
            style: {
              width: '260px',
              padding: '14px',
              'max-width': 'calc(100vw - 50px)',
            },
            elements: [
              {
                type: 'page-setting',
                content: res,
              },
            ],
          });
        },
        (error) => {
          this.builder.loading$.next(false);
          const { statusText } = error;
          this.util.openSnackbar(statusText, 'ok');
        },
      );
  }

  coverExtraData(page: IPage): any {
    const currentPage: IPage = { ...page };
    currentPage.label = page.title;
    currentPage.body = page.body.map((item) => {
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

  formatToExtraData(page: IPage): IPage {
    return {
      ...page,
      title: this.getTitle(page.title),
      body: this.initExtraBody(page.body),
    };
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

  addBlock(addType: string, content: any, target: any): void {
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
          path: this.util.generatePath(target),
          content,
        },
      ],
    });
  }

  initExtraBody(body: any[]): any[] {
    let components = [];
    if (body.length) {
      components = body.map((item) => {
        return {
          extra: {
            uuid: item.uuid,
            id: item.id,
            type: item.type,
          },
          ...item.attributes.body,
        };
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
