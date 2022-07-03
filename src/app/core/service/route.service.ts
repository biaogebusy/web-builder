import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {}

  updateQueryParams(query: Params): void {
    const url = this.router
      .createUrlTree([], {
        relativeTo: this.activatedRoute,
        queryParams: query,
      })
      .toString();

    this.location.go(url);
  }

  eventLinkToNav(event: any): void {
    if (event.target.nodeName === 'A') {
      event.preventDefault();
      const target = event.target;
      const link = target.href.split(target.host)[1];
      this.router.navigate([link]);
    }
  }

  isAbsolute(href: string): boolean {
    const r = new RegExp('^(?:[a-z]+:)?//', 'i');
    return r.test(href);
  }
}
