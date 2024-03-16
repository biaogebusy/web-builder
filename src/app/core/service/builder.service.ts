import { Inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { API_URL, CORE_CONFIG, USER } from '@core/token/token-providers';
import type {
  ICoreConfig,
  IPage,
  IPageForJSONAPI,
} from '@core/interface/IAppConfig';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import type { IUser } from '@core/interface/IUser';
import { UtilitiesService } from './utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import { NodeService } from './node.service';
import { takeUntil, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BuilderService extends ApiService {
  constructor(
    private http: HttpClient,
    private util: UtilitiesService,
    private builder: BuilderState,
    private nodeService: NodeService,
    @Inject(API_URL) public apiBaseUrl: string,
    @Inject(CORE_CONFIG) private coreConfig: ICoreConfig,
    @Inject(USER) private user: IUser
  ) {
    super(apiBaseUrl);
  }

  loadPage(id: string): void {
    this.nodeService
      .fetch(`/api/v3/landingPage/json/${id}`, 'noCache=1')
      .subscribe((page: IPage) => {
        const { body, status } = page;
        this.builder.loading$.next(false);
        if (status) {
          if (body.length) {
            this.builder.loadNewPage(this.formatToExtraData(page));
          } else {
            this.util.openSnackbar('当前内容为空，请添加组件', 'ok');
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
        this.optionsWithCookieAndToken(csrf_token)
      )
      .pipe(
        tap((res: any) => {
          const {
            data: { id },
          } = res;
          this.loadPage(id);
        })
      );
  }

  updateLandingPage(page: IPage): Observable<any> {
    const {
      builder: {
        api: { update },
      },
    } = this.coreConfig;
    const { csrf_token } = this.user;
    this.builder.loading$.next(true);
    return this.http
      .patch(
        `${this.apiUrl}${update}/${page.id}`,
        this.coverExtraData(page),
        this.optionsWithCookieAndToken(csrf_token)
      )
      .pipe(
        tap((res: any) => {
          const {
            data: { id },
          } = res;
          this.loadPage(id);
        })
      );
  }

  formatPage(page: IPage): IPageForJSONAPI {
    const currentPage: IPage = Object.assign({}, page);
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

  coverExtraData(page: IPage): any {
    const currentPage: IPage = Object.assign({}, page);
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
      title: page.title,
      status: page.status,
      uuid: page.uuid,
      id: page.id,
      body: page.body.map((item) => {
        return {
          extra: {
            uuid: item.uuid,
            id: item.id,
            type: item.type,
          },
          ...item.attributes.body,
        };
      }),
    };
  }
}
