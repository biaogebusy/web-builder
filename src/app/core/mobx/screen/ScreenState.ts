import { Injectable } from '@angular/core';
import { Subject, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { BreakpointObserver } from '@angular/cdk/layout';
import { action, observable } from 'mobx-angular';
import { MatDrawer } from '@angular/material/sidenav';
import { MediaObserver, MediaChange } from '@angular/flex-layout';

@Injectable({
  providedIn: 'root',
})
export class ScreenState {
  public scroll$ = new Subject();
  public drawer$ = new Subject();
  public stickyMenu$ = new Subject();

  @observable viewPort: string[];
  @observable isDrawer = false;

  constructor(
    public breakpointObserver: BreakpointObserver,
    public mediaObserver: MediaObserver
  ) {
    this.initScreen();
    this.initBrowserEvents();
  }

  @action
  initScreen(): any {
    this.mediaObserver
      .asObservable()
      .pipe(
        distinctUntilChanged(
          (x: MediaChange[], y: MediaChange[]) =>
            this.getAlias(x) === this.getAlias(y)
        )
      )
      .subscribe((change) => {
        this.viewPort = change.map((item) => {
          return item.mqAlias;
        });
      });
  }

  getAlias(change: MediaChange[]): any {
    return change[0].mqAlias;
  }

  eq(targetPoint: string): boolean {
    return this.viewPort.includes(targetPoint);
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
