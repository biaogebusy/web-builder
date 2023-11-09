import { Inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { API_URL, CORE_CONFIG, USER } from '@core/token/token-providers';
import { ICoreConfig, IPage } from '@core/interface/IAppConfig';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IUser } from '@core/interface/IUser';

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
      create,
      page,
      this.optionsWithCookieAndToken(csrf_token)
    );
  }
}
