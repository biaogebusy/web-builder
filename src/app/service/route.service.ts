import { Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  updateQueryParams(query: Params): void {
    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: query,
        queryParamsHandling: 'merge',
      });
  }

  isAbsolute(href: string): boolean {
    const r = new RegExp('^(?:[a-z]+:)?//', 'i');
    return r.test(href);
  }
}
