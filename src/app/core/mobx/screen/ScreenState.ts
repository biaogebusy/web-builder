import { Injectable } from '@angular/core';
import { Subject, Observable, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { BreakpointObserver } from '@angular/cdk/layout';
import { action, observable } from 'mobx-angular';
import { MatDrawer } from '@angular/material/sidenav';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { ScreenService } from '@core/service/screen.service';

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
    public mediaObserver: MediaObserver,
    private screenService: ScreenService
  ) {
    if (this.screenService.isPlatformBrowser()) {
      this.initScreen();
      this.initBrowserEvents();
    }
  }

  @action
  initScreen(): any {
    this.mqAlias$().subscribe((mq) => {
      this.viewPort = mq;
    });
  }

  mqAlias$(): Observable<string[]> {
    return this.mediaObserver.asObservable().pipe(
      distinctUntilChanged(
        (x: MediaChange[], y: MediaChange[]) =>
          this.getAlias(x) === this.getAlias(y)
      ),
      map((change: any) => {
        return change.map((item: any) => {
          return item.mqAlias;
        });
      })
    );
  }

  getAlias(change: MediaChange[]): any {
    return change[0].mqAlias;
  }

  eq(targetPoint: string): boolean {
    if (this.screenService.isPlatformBrowser()) {
      return this.viewPort.includes(targetPoint);
    } else {
      // TODO: need confirm
      return 'xs' === targetPoint;
    }
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
