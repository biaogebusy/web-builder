import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { Event, NavigationStart, Router } from '@angular/router';
import { AppState } from '@core/mobx/AppState';
import type { IHeader } from '@core/mobx/IBranding';
import { ScreenState } from '@core/mobx/screen/ScreenState';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent implements OnInit {
  @Input() isDrawer: boolean;
  @Input() content: IHeader;
  isOpened = false;
  show = true;

  constructor(
    public screen: ScreenState,
    public appState: AppState,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {
    this.router.events.subscribe((event: Event) => {
      if (this.isDrawer && event instanceof NavigationStart) {
        this.screen.toggleDrawer(true);
      }
    });
  }

  ngOnInit(): void {
    this.screen.mqAlias$().subscribe((res: string[]) => {
      this.show = res.includes('gt-sm');
      this.cd.detectChanges();
    });
  }

  onToggle(): void {
    this.isOpened = !this.isOpened;
    this.screen.toggleDrawer(this.isOpened);
    this.cd.detectChanges();
  }

  trackByFn(index: number, item: any): number {
    return index;
  }
}
