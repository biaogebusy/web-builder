import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
} from '@angular/core';
import { ScreenService } from '@core/service/screen.service';
import { ScreenState } from '@core/state/screen/ScreenState';
import { fromEvent, of } from 'rxjs';
import { mergeMap, delay, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-hover-menu',
  templateUrl: './hover-menu.component.html',
  styleUrls: ['./hover-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HoverMenuComponent implements OnInit {
  @Input() content: any;
  active: boolean;
  constructor(
    private eleRef: ElementRef,
    private cd: ChangeDetectorRef,
    private screenService: ScreenService,
    private screenState: ScreenState
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
        this.cd.detectChanges();
      });

    leave
      .pipe(
        mergeMap((event) => {
          return of(event).pipe(delay(100), takeUntil(enter));
        })
      )
      .subscribe((event) => {
        this.active = false;
        this.cd.detectChanges();
      });

    this.screenState.stickyMenu$.subscribe((sticky) => {
      if (!sticky) {
        return;
      }
      this.active = false;
      this.cd.detectChanges();
    });
  }
}
