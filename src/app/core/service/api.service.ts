import { HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { IPager } from '@core/interface/widgets/IWidgets';
import { API_URL } from '@core/token/token-providers';
import { camelCase, isArray, remove, result } from 'lodash-es';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public configLoadDone$ = new Subject();

  constructor(@Inject(API_URL) public apiBaseUrl: string) {}

  get apiUrl(): string {
    return this.apiBaseUrl;
  }

  get localUserKey(): string {
    return camelCase(this.apiBaseUrl.split('//')[1]);
  }

  get logoutToken(): string {
    return 'logoutToken';
  }

  get httpOptionsOfCommon(): any {
    return {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    };
  }

  optionsWithCookieAndToken(csrfToken: string): any {
    return {
      headers: new HttpHeaders({
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'X-CSRF-Token': csrfToken,
      }),
      withCredentials: true,
    };
  }

  getParams(obj: any, key: string): any {
    return obj && obj.params && obj.params[key];
  }

  getDeepValue(obj: any, path: string): any {
    return result(obj, path);
  }

  // For drupal view json api
  getApiParams(state: any): string {
    const params: string[] = [];
    if (state) {
      Object.keys(state).forEach((key) => {
        const val = state[key];
        if (val) {
          if (isArray(val)) {
            const final = remove(val, (item) => item !== undefined);
            if (final.length > 0) {
              params.push(`${key}=${final.join('+')}`);
            } else {
              return;
            }
          } else {
            params.push(`${key}=${val}`);
          }
        }
      });
    }
    return params.join('&');
  }
  handlerPager(pager: any, length?: number): IPager {
    if (pager.current_page === null && pager.total_pages === 0) {
      return {
        itemsPerPage: length || pager.total_items,
        currentPage: 0,
        totalItems: pager.total_items,
      };
    } else {
      return {
        itemsPerPage: pager.items_per_page,
        currentPage: (pager.current_page || 0) + 1,
        totalItems: pager.total_items,
      };
    }
  }
}
