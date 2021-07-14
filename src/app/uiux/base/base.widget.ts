import { Component, Injectable, OnInit } from '@angular/core';

@Injectable()
export abstract class BaseComponent {
  abstract content: any;
  constructor() {}

  getParams(content: any, key: string): string {
    return content.params && content.params[key];
  }

  getValue(content: any, path: string, key: string): string {
    return content[path] && content[path][key];
  }

  row(content: any): string {
    return `0 0 calc(100% / ${content.row || 3} - 4rem)`;
  }
}
