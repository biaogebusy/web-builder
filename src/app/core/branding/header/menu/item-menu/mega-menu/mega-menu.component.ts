import { Component, Input, OnInit, ElementRef } from '@angular/core';
import { fromEvent, Observable, of } from 'rxjs';
import { mergeMap, delay, takeUntil } from 'rxjs/operators';
import { ScreenState } from 'src/app/mobx/screen/ScreenState';

@Component({
  selector: 'app-mega-menu',
  templateUrl: './mega-menu.component.html',
  styleUrls: ['./mega-menu.component.scss'],
})
export class MegaMenuComponent implements OnInit {
  @Input() content: any;
  active: boolean;
  constructor(private eleRef: ElementRef, private screenState: ScreenState) {}

  ngOnInit(): void {
    this.initActionEvent();
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
}
