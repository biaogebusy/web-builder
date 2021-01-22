import { Injectable } from '@angular/core';
import { Subject, Observable, fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { action, observable, computed } from 'mobx-angular';
import { MatDrawer } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root',
})
export class ScreenState {
  public scroll$ = new Subject();
  public drawer$ = new Subject();
  @observable viewPort = 'xs';
  @observable isDrawer = false;
  @observable state = {
    viewPort: this.viewPort,
  };

  constructor(public breakpointObserver: BreakpointObserver) {
    this.initScreen();
    this.initBrowserEvents();
  }

  @action
  initScreen(): any {
    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .subscribe((state: BreakpointState) => {
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

  initBrowserEvents(): void {
    const scroll = fromEvent(window, 'scroll')
      .pipe(debounceTime(200))
      .subscribe(() => {
        this.scroll$.next();
      });
  }

  @action
  toggleDrawer(open: boolean): any {
    this.drawer$.next();
  }

  @action
  updateDrwer(drawer: MatDrawer): void {
    this.isDrawer = drawer.opened;
  }
}
