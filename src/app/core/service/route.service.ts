import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UtilitiesService } from '@core/service/utilities.service';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private util: UtilitiesService
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

  toNavigate(event: any, link: any): void {
    const href = link.href;
    if (!this.util.getFileType(href)) {
      if (href.startsWith('/print') || href.startsWith('/export')) {
        event.preventDefault();
        window.open(href, link.target || '_self');
        return;
      }
      if (this.isAbsolute(href)) {
        event.preventDefault();
        window.open(href, link.target || '_self');
      } else {
        event.preventDefault();
        this.router.navigate([href]);
      }
    }
  }

  eventLinkToNav(event: any): void {
    if (event.target.nodeName === 'A') {
      const target = event.target;
      const link = target.href.split(target.host)[1];
      if (!this.util.getFileType(link)) {
        // not file type
        if (target.target === '_blank') {
          event.preventDefault();
          window.open(link, '_blank');
          return;
        }
        event.preventDefault();
        this.router.navigate([link]);
      }
    }
  }

  isAbsolute(href: string): boolean {
    const r = new RegExp('^(?:[a-z]+:)?//', 'i');
    return r.test(href);
  }
}
