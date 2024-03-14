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

@Injectable({
  providedIn: 'root',
})
export class BuilderService extends ApiService {
  constructor(
    private http: HttpClient,
    @Inject(API_URL) public apiBaseUrl: string,
    @Inject(CORE_CONFIG) private coreConfig: ICoreConfig,
    @Inject(USER) private user: IUser
  ) {
    super(apiBaseUrl);
  }

  createLandingPage(page: IPage): Observable<any> {
    const {
      builder: {
        api: { create },
      },
    } = this.coreConfig;
    const { csrf_token } = this.user;
    return this.http.post(
      `${this.apiUrl}${create}`,
      this.formatPage(page),
      this.optionsWithCookieAndToken(csrf_token)
    );
  }

  updateLandingPage(page: IPage): Observable<any> {
    const {
      builder: {
        api: { update },
      },
    } = this.coreConfig;
    const { csrf_token } = this.user;
    return this.http.patch(
      `${this.apiUrl}${update}`,
      this.formatPage(page),
      this.optionsWithCookieAndToken(csrf_token)
    );
  }

  formatPage(page: IPage): IPageForJSONAPI {
    page.body = page.body.map((item) => {
      return {
        type: 'json',
        attributes: {
          body: item,
        },
      };
    });
    return page;
  }

  coverExtraData(page: IPage): any {
    page.body = page.body.map((item) => {
      const { uuid, id, type } = item.extra;
      return {
        uuid,
        id,
        type,
        attributes: {
          body: item,
        },
      };
    });
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
