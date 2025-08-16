import { Injectable, inject } from '@angular/core';
import { Params } from '@angular/router';
import { IPager } from '@core/interface/widgets/IWidgets';
import { ApiService } from '@core/service/api.service';
import { isArray, result } from 'lodash-es';
@Injectable()
export abstract class BaseComponent {
  apiService = inject(ApiService);
  abstract content: any;

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
    return controls.map(control => {
      if (control.key in query) {
        control.value = query[control.key];
        return control;
      } else {
        return control;
      }
    });
  }

  getApiParams(state: any): string {
    return this.apiService.getApiParams(state);
  }

  getFormParams(state: any): Params {
    const formParams: any = {};
    if (state) {
      Object.keys(state).forEach(key => {
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
    return this.apiService.handlerPager(pager, length);
  }

  getScroller(): HTMLElement | Window {
    const scroller = document.getElementById('builder-list');
    if (scroller) {
      return scroller;
    } else {
      return window;
    }
  }
}
