import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UtilitiesService } from '@core/service/utilities.service';
import { ContentState } from '@core/state/ContentState';
import { ContentService } from './content.service';
import { IPage } from '@core/interface/IAppConfig';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private util: UtilitiesService,
    private contentService: ContentService,
    private contentState: ContentState
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
    if (link.drawerIframe) {
      this.contentState.drawerOpened$.next(true);
      this.contentState.drawerLoading$.next(true);
      this.contentState.drawerContent$.next({
        title: link.label,
        body: [
          {
            type: 'iframe',
            url: link.href,
            width: '800px',
            classes: 'p-x-xs',
          },
        ],
      });
      this.contentState.drawerLoading$.next(false);
      event.preventDefault();
      return;
    }
    if (!this.util.getFileType(href)) {
      if (
        href.startsWith('/print') ||
        href.startsWith('/export') ||
        href.startsWith('/manage')
      ) {
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
        if (target.rel === 'drawer') {
          this.contentState.drawerOpened$.next(true);
          this.contentState.drawerLoading$.next(true);
          this.contentService
            .loadPageContent(link)
            .subscribe((content: IPage) => {
              this.contentState.drawerContent$.next(content);
              this.contentState.drawerLoading$.next(false);
            });
          event.preventDefault();
          return;
        }
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
