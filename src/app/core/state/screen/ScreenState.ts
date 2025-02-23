import { Injectable, inject } from '@angular/core';
import { Subject, Observable, fromEvent, BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ScreenService } from '@core/service/screen.service';

@Injectable({
  providedIn: 'root',
})
export class ScreenState {
  breakpointObserver = inject(BreakpointObserver);
  private screenService = inject(ScreenService);

  public scroll$ = new BehaviorSubject<boolean>(true);
  public drawer$ = new Subject();
  public stickyMenu$ = new Subject();
  displayNameMap = new Map([
    [Breakpoints.XSmall, 'xs'],
    [Breakpoints.Small, 'sm'],
    [Breakpoints.Medium, 'md'],
    [Breakpoints.Large, 'lg'],
    [Breakpoints.XLarge, 'xl'],
  ]);

  viewPort: string[];

  constructor() {
    if (this.screenService.isPlatformBrowser()) {
      this.initScreen();
      this.initBrowserEvents();
    }
  }

  initScreen(): any {
    this.mqAlias$().subscribe(mq => {
      this.viewPort = mq;
    });
  }

  mqAlias$(): Observable<string[]> {
    return this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .pipe(
        distinctUntilChanged(),
        map(result => {
          for (const query of Object.keys(result.breakpoints)) {
            if (result.breakpoints[query]) {
              return [this.displayNameMap.get(query) ?? 'Unknown'];
            }
          }
          return ['unknown'];
        })
      );
  }

  eq(targetPoint: string): boolean {
    if (this.screenService.isPlatformBrowser()) {
      if (this.viewPort?.length) {
        return this.viewPort.includes(targetPoint);
      }
      return false;
    } else {
      return 'xs' === targetPoint;
    }
  }

  initBrowserEvents(): void {
    const scroll = fromEvent(window, 'scroll')
      .pipe(debounceTime(200))
      .subscribe(() => {
        this.scroll$.next(true);
      });
  }

  toggleDrawer(): any {
    this.drawer$.next(true);
  }
}
