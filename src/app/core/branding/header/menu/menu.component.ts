import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { Event, NavigationStart, Router } from '@angular/router';
import type { IHeader } from '@core/interface/IBranding';
import { ScreenState } from '@core/state/screen/ScreenState';
import { version } from '../../../../../../package.json';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent implements OnInit {
  @Input() isDrawer: boolean;
  @Input() content: IHeader | undefined;
  isOpened = false;
  show = true;

  constructor(
    public screen: ScreenState,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {
    this.router.events.subscribe((event: Event) => {
      if (this.isDrawer && event instanceof NavigationStart) {
        this.screen.toggleDrawer();
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
    this.screen.toggleDrawer();
    this.cd.detectChanges();
  }

  trackByFn(index: number, item: any): number {
    return index;
  }

  get version(): string {
    return version;
  }
}
