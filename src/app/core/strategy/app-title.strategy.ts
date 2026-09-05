import { Injectable, Injector, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

/**
 * Route-declared document titles, resolved through TranslateService so every
 * navigation deterministically resets the tab title. Routes opt in via
 * `data: { titleKey: 'BUILDER.HUB.PAGE_TITLE' }`; the deepest route with a
 * titleKey wins. Routes without a titleKey keep the current title, so
 * CMS-driven pages keep owning the title via TagsService.updateTags().
 *
 * TranslateService must be resolved lazily: the router constructs its
 * TitleStrategy during bootstrap, and eagerly pulling the ngx-translate
 * service graph at that point stalls server-side rendering.
 */
@Injectable()
export class AppTitleStrategy extends TitleStrategy {
  private injector = inject(Injector);
  private title = inject(Title);
  private isServer = isPlatformServer(inject(PLATFORM_ID));
  private navId = 0;

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const titleKey = this.resolveTitleKey(snapshot.root);
    if (!titleKey) {
      return;
    }
    // Waiting for the i18n HTTP load inside SSR deadlocks the render (the
    // fetch targets the same origin the render is served from). App-route
    // titles are a browser-tab concern; CMS pages own their SSR titles via
    // TagsService.updateTags(), so skip on the server.
    if (this.isServer) {
      return;
    }
    // Translations load over HTTP, so get() may resolve after a newer
    // navigation; only the latest navigation may write the title.
    const navId = ++this.navId;
    this.injector.get(TranslateService)
      .get(titleKey)
      .subscribe(translated => {
        if (navId === this.navId) {
          this.title.setTitle(translated);
        }
      });
  }

  private resolveTitleKey(route: ActivatedRouteSnapshot): string | undefined {
    let titleKey: string | undefined;
    let current: ActivatedRouteSnapshot | null = route;
    while (current) {
      const key = current.data?.['titleKey'];
      if (typeof key === 'string' && key) {
        titleKey = key;
      }
      current = current.firstChild;
    }
    return titleKey;
  }
}
