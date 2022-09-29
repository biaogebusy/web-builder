import { InjectionToken } from '@angular/core';
import { IPage } from '@core/mobx/IAppConfig';
import { Observable } from 'rxjs';

export const API_URL = new InjectionToken<string>('api url');

export const PAGE_CONTENT = new InjectionToken<Observable<IPage | object>>(
  'page_content'
);
export const THEME = new InjectionToken<string>('current theme');
