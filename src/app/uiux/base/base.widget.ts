import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { IPager } from '@core/interface/widgets/IWidgets';
import { isArray, remove, result } from 'lodash-es';
@Injectable()
export abstract class BaseComponent {
  abstract content: any;

  constructor() {}

  getParams(obj: any, key: string): any {
    return obj?.params && obj.params[key];
  }

  getValue(obj: any, path: string, key: string): any {
    return obj[path] && obj[path][key];
  }

  getDeepValue(obj: any, path: string): any {
    return result(obj, path);
  }

  row(row = 3, padding = '4rem'): string {
    return `0 0 calc(100% / ${row} - ${padding})`;
  }

  initFormValueWithUrlQuery(query: any, controls: any[]): any {
    return controls.map((control) => {
      if (control.key in query) {
        control.value = query[control.key];
        return control;
      } else {
        return control;
      }
    });
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

  getFormParams(state: any): Params {
    const formParams: any = {};
    if (state) {
      Object.keys(state).forEach((key) => {
        const val = state[key];
        if (val !== '') {
          if (isArray(val)) {
            if (val.length > 0) {
              formParams[key] = val.join('+');
            } else {
              delete formParams[key];
            }
          } else {
            formParams[key] = val;
          }
        } else {
          delete formParams[key];
        }
      });
    }
    return formParams;
  }

  getParamsState(formValues: any, options: any): any {
    return Object.assign({}, formValues, options);
  }

  getUrlQuery(formValues: any, options: any = {}): any {
    const state = this.getParamsState(formValues, options);
    const query: Params = this.getFormParams(state);
    return query;
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

  transferStoryData(instance: any): void {
    Object.keys(instance.content.data).forEach((key: string) => {
      instance[key] = instance.content.data[key];
    });
  }

  getScroller(): HTMLElement | Window {
    const scroller = document.getElementById('gsap-scroller');
    if (scroller) {
      return scroller;
    } else {
      return window;
    }
  }
}
