import { HttpHeaders } from '@angular/common/http';
import { Injectable, inject, DOCUMENT } from '@angular/core';
import { ILanguage } from '@core/interface/IEnvironment';
import { IPager } from '@core/interface/widgets/IWidgets';
import { API_URL } from '@core/token/token-providers';
import { camelCase, isArray, remove, result } from 'lodash-es';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public configLoadDone$ = new Subject();
  public document = inject(DOCUMENT);
  private apiBaseUrl = inject(API_URL);

  get apiUrl(): string {
    return this.apiBaseUrl;
  }

  get localUserKey(): string {
    return camelCase(this.apiBaseUrl.split('//')[1]);
  }

  get httpOptionsOfCommon(): any {
    return {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }),
    };
  }

  optionsWithCookieAndToken(csrfToken: string): any {
    return {
      headers: new HttpHeaders({
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'X-CSRF-Token': csrfToken,
      }),
      withCredentials: true,
    };
  }

  get pageUrl(): string {
    const location = this.document.location;
    const path = location.pathname;
    const search = location.search;
    const allowKey = ['version', 'preview', 'nocache'];
    if (
      allowKey.some(key => {
        return search.toLowerCase().indexOf(key) > 0;
      })
    ) {
      const params = search.split('?')[1];
      return `${path}&${params}`;
    } else {
      return path;
    }
  }

  getLang(path: string): ILanguage | undefined {
    const { multiLang, langs } = environment;

    if (!multiLang) {
      return undefined;
    }
    if (multiLang && langs) {
      const lang = path.split('/')[1];
      const currentLang = langs.find(item => item.langCode === lang);
      if (currentLang) {
        return currentLang;
      } else {
        // default language
        const defLang = langs.find(item => item.default);
        if (!defLang) {
          return undefined;
        }
        return defLang;
      }
    }

    return undefined;
  }

  getUrlPath(pageUrl: string): { lang: string; path: string } {
    const currentLang = this.getLang(pageUrl);
    let lang = '';
    let path = pageUrl;
    if (currentLang && !currentLang.default) {
      lang = currentLang.prefix;
      if (lang) {
        path = pageUrl.split(lang)[1];
      }
    }
    return {
      lang,
      path,
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
      Object.keys(state).forEach(key => {
        const val = state[key];
        if (val) {
          if (isArray(val)) {
            const final = remove(val, item => item !== undefined);
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
        currentPage: pager.current_page,
        totalItems: pager.total_items,
      };
    }
  }
}
