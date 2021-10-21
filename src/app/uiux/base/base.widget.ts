import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { isArray, result } from 'lodash-es';
import { Observable } from 'rxjs';
import { NodeService } from 'src/app/service/node.service';
import { RouteService } from 'src/app/service/route.service';

@Injectable()
export abstract class BaseComponent {
  abstract content: any;

  constructor(
    public nodeService: NodeService,
    public routerService: RouteService
  ) {}

  getParams(obj: any, key: string): any {
    return obj.params && obj.params[key];
  }

  getValue(obj: any, path: string, key: string): any {
    return obj[path] && obj[path][key];
  }

  getDeepValue(obj: any, path: string): any {
    return result(obj, path);
  }

  row(content: any, padding = '4rem'): string {
    return `0 0 calc(100% / ${content.row || 3} - ${padding})`;
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
  getApiParams(state: any): any {
    const params: string[] = [];
    if (state) {
      Object.keys(state).forEach((key) => {
        const val = state[key];
        if (val) {
          if (isArray(val)) {
            if (val.length > 0) {
              params.push(`${key}=${val.join('+')}`);
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
        if (val) {
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

  updateUrl(formValues: any, options: any = {}): any {
    const state = this.getParamsState(formValues, options);
    const query: Params = this.getFormParams(state);
    this.routerService.updateQueryParams(query);
  }

  nodeSearchByParams(
    type: string,
    formValues: any,
    options: any
  ): Observable<any> {
    const state = this.getParamsState(formValues, options);
    const params = this.getApiParams(state);
    return this.nodeService.search(type, params);
  }
}
