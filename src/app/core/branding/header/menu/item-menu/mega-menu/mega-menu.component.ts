import { Component, Input, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { fromEvent, Observable, of } from 'rxjs';
import { mergeMap, delay, takeUntil } from 'rxjs/operators';
import { ScreenState } from '@core/mobx/screen/ScreenState';
import { ScreenService } from '@core/service/screen.service';

@Component({
  selector: 'app-mega-menu',
  templateUrl: './mega-menu.component.html',
  styleUrls: ['./mega-menu.component.scss'],
})
export class MegaMenuComponent implements OnInit, OnDestroy {
  @Input() content: any;
  active: boolean;
  constructor(
    private eleRef: ElementRef,
    private screenState: ScreenState,
    private screenService: ScreenService
  ) {}

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.initActionEvent();
    }
  }

  initActionEvent(): void {
    const megaMenu = this.eleRef.nativeElement;
    const enter = fromEvent(megaMenu, 'mouseenter');
    const leave = fromEvent(megaMenu, 'mouseleave');

    enter
      .pipe(
        mergeMap((event) => {
          return of(event).pipe(delay(100), takeUntil(leave));
        })
      )
      .subscribe((event) => {
        this.active = true;
      });

    leave
      .pipe(
        mergeMap((event) => {
          return of(event).pipe(delay(100), takeUntil(enter));
        })
      )
      .subscribe((event) => {
        this.active = false;
      });

    this.screenState.stickyMenu$.subscribe((sticky) => {
      if (!sticky) {
        return;
      }
      this.active = false;
    });
  }

  ngOnDestroy(): void {}
}
