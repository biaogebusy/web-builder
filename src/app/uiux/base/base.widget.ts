import { Injectable } from '@angular/core';

@Injectable()
export abstract class BaseComponent {
  abstract content: any;
  constructor() {}

  getParams(content: any, key: string): any {
    return content.params && content.params[key];
  }

  getValue(content: any, path: string, key: string): any {
    return content[path] && content[path][key];
  }

  row(content: any): string {
    return `0 0 calc(100% / ${content.row || 3} - 4rem)`;
  }
}
