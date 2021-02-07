import { Injectable, ElementRef } from '@angular/core';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { action, observable, computed } from 'mobx-angular';
import { Element } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class ScreenService {
  constructor() {}

  isElementInViewport(el: any): boolean {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight ||
          document.documentElement.clientHeight) /* or $(window).height() */ &&
      rect.right <=
        (window.innerWidth ||
          document.documentElement.clientWidth) /* or $(window).width() */
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
      rect.top > (window.innerHeight || document.documentElement.clientHeight)
    );
  }

  gotoTop(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
