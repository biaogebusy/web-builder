import { Injectable } from '@angular/core';
import { Subject, Observable, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { ScreenService } from '@core/service/screen.service';

@Injectable({
  providedIn: 'root',
})
export class ScreenState {
  public scroll$ = new Subject();
  public drawer$ = new Subject();
  public stickyMenu$ = new Subject();

  viewPort: string[];

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
        this.scroll$.next();
      });
  }

  toggleDrawer(): any {
    this.drawer$.next();
  }
}
