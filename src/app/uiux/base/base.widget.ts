import { Injectable } from '@angular/core';
import { result } from 'lodash-es';

@Injectable()
export abstract class BaseComponent {
  abstract content: any;
  constructor() {}

  getParams(obj: any, key: string): any {
    return obj.params && obj.params[key];
  }

  getValue(obj: any, path: string, key: string): any {
    return obj[path] && obj[path][key];
  }

  getDeepValue(obj: any, path: string): any {
    return result(obj, path);
  }

  row(content: any): string {
    return `0 0 calc(100% / ${content.row || 3} - 4rem)`;
  }
}
