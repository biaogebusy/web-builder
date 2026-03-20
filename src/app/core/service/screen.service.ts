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

  scrollToAnchor(anchor: string, maxWait = 5000): void {
    const selector = '#' + anchor;
    const element = this.document.querySelector(selector);
    if (element) {
      this.revealAndScroll(element);
      return;
    }
    const interval = 100;
    let elapsed = 0;
    const timer = setInterval(() => {
      elapsed += interval;
      const el = this.document.querySelector(selector);
      if (el) {
        clearInterval(timer);
        this.revealAndScroll(el);
      } else if (elapsed >= maxWait) {
        clearInterval(timer);
      }
    }, interval);
  }

  private revealAndScroll(el: Element): void {
    // 移除目标元素及其祖先上的 AOS 动画属性，使其立即可见
    let node: Element | null = el;
    while (node) {
      if (node.hasAttribute('data-aos')) {
        node.removeAttribute('data-aos');
        node.classList.add('aos-animate');
      }
      node = node.parentElement;
    }
    setTimeout(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }, 100);
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
