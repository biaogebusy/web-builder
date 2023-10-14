import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ClarityService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  init(id: string): void {
    this.clarity(window, this.document, 'clarity', 'script', id);
  }

  clarity(c: any, l: any, a: any, r: any, i: any): void {
    let t: any;
    let y: any;
    c[a] =
      c[a] ||
      function () {
        (c[a].q = c[a].q || []).push(arguments);
      };
    t = l.createElement(r);
    t.async = 1;
    t.src = 'https://www.clarity.ms/tag/' + i;
    y = l.getElementsByTagName(r)[0];
    y.parentNode.insertBefore(t, y);
  }
}
