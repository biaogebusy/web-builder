import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser, isPlatformServer } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ScreenService {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) public platformId: object
  ) {}

  isPlatformServer(): boolean {
    return isPlatformServer(this.platformId);
  }

  isPlatformBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  isElementInViewport(el: any): boolean {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight ||
          this.document.documentElement
            .clientHeight) /* or $(window).height() */ &&
      rect.right <=
        (window.innerWidth ||
          this.document.documentElement.clientWidth) /* or $(window).width() */
    );
  }

  isElementOutTopViewport(el: any): boolean {
    const rect = el.getBoundingClientRect();
    return (
      rect.top < -el.clientHeight &&
      rect.bottom <= 0 /* or $(window).height() */
    );
  }

  isElementOutBottomViewport(el: any): boolean {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >
      (window.innerHeight || this.document.documentElement.clientHeight)
    );
  }

  scrollToAnchor(location: string, wait = 0): void {
    const element = this.document.querySelector('#' + location);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest',
        });
      }, wait);
    }
  }

  gotoTop(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
