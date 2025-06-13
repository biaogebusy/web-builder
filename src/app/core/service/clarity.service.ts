
import { Injectable, inject, DOCUMENT } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClarityService {
  private document = inject<Document>(DOCUMENT);

  init(id: string): void {
    const { host } = window.location;
    if (environment.production && !host.includes('localhost')) {
      this.clarity(window, this.document, 'clarity', 'script', id);
    }
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
