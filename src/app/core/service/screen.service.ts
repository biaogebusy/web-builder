import { Injectable, PLATFORM_ID, inject, DOCUMENT } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ScreenService {
  private document = inject<Document>(DOCUMENT);
  private platformId = inject(PLATFORM_ID);

  private main: any;
  private sidebar: any;
  private container: any;

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
          this.document.documentElement.clientHeight) /* or $(window).height() */ &&
      rect.right <=
        (window.innerWidth || this.document.documentElement.clientWidth) /* or $(window).width() */
    );
  }

  isElementOutTopViewport(el: any): boolean {
    const rect = el.getBoundingClientRect();
    return rect.top < -el.clientHeight && rect.bottom <= 0 /* or $(window).height() */;
  }

  isElementOutBottomViewport(el: any): boolean {
    const rect = el.getBoundingClientRect();
    return rect.top > (window.innerHeight || this.document.documentElement.clientHeight);
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

  initSidebarStyle(opened: any): void {
    this.main = this.document.getElementById('main-container');
    this.sidebar = this.document.getElementById('sidebar');
    this.container = this.sidebar.getElementsByClassName('mat-drawer-inner-container')[0];
    if (opened) {
      this.main.style.paddingLeft = '0';
      this.sidebar.style.overflow = 'auto';
      this.container.style.overflow = 'auto';
    } else {
      this.main.style.paddingLeft = '80px';
      this.sidebar.style.overflow = 'visible';
      this.container.style.overflow = 'visible';
    }
  }
}
