import {
  Component,
  Input,
  OnInit,
  ElementRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  inject,
} from '@angular/core';
import { fromEvent, of } from 'rxjs';
import { mergeMap, delay, takeUntil } from 'rxjs/operators';
import { ScreenState } from '@core/state/screen/ScreenState';
import { ScreenService } from '@core/service/screen.service';
import type { IMainMenu } from '@core/interface/branding/IBranding';

@Component({
  selector: 'app-mega-menu',
  templateUrl: './mega-menu.component.html',
  styleUrls: ['./mega-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class MegaMenuComponent implements OnInit {
  @Input() content: IMainMenu;
  active: boolean;
  private eleRef = inject(ElementRef);
  private screenState = inject(ScreenState);
  private screenService = inject(ScreenService);
  private cd = inject(ChangeDetectorRef);

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
        mergeMap(event => {
          return of(event).pipe(delay(100), takeUntil(leave));
        })
      )
      .subscribe(() => {
        this.active = true;
        this.cd.detectChanges();
      });

    leave
      .pipe(
        mergeMap(event => {
          return of(event).pipe(delay(100), takeUntil(enter));
        })
      )
      .subscribe(() => {
        this.active = false;
        this.cd.detectChanges();
      });

    this.screenState.stickyMenu$.subscribe(sticky => {
      if (!sticky) {
        return;
      }
      this.active = false;
      this.cd.detectChanges();
    });
  }
}
