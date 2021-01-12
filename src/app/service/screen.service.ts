import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { action, observable, computed } from 'mobx-angular';

@Injectable({
  providedIn: 'root'
})
export class ScreenService {
  @observable viewPort = 'xs';
  @observable state = {
    viewPort: this.viewPort
  };

  constructor(
    public breakpointObserver: BreakpointObserver
  ) {
    this.initScreen();
  }

  @action
  initScreen(): any {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ]).subscribe((state: BreakpointState) => {
      if (state.breakpoints[Breakpoints.XSmall]) {
        this.viewPort = 'xs';
      }
      if (state.breakpoints[Breakpoints.Small]) {
        this.viewPort = 'sm';
      }
      if (state.breakpoints[Breakpoints.Medium]) {
        this.viewPort = 'md';
      }
      if (state.breakpoints[Breakpoints.Large]) {
        this.viewPort = 'lg';
      }
      if (state.breakpoints[Breakpoints.XLarge]) {
        this.viewPort = 'xl';
      }
    });
  }

  eq(targetPoint: string): boolean {
    return targetPoint === this.viewPort;
  }

  isElementInViewport(el: any): boolean {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
      rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
    );
  }
}
