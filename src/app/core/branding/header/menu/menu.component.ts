import { Component, OnInit, Input, inject } from '@angular/core';
import { Event, NavigationStart, Router } from '@angular/router';
import type { IBranding } from '@core/interface/branding/IBranding';
import { ScreenState } from '@core/state/screen/ScreenState';
import { BRANDING, CORE_CONFIG } from '@core/token/token-providers';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: false,
})
export class MenuComponent implements OnInit {
  @Input() isDrawer: boolean;
  public coreConfig = inject<ICoreConfig>(CORE_CONFIG);
  public branding$ = inject<Observable<IBranding>>(BRANDING);
  public show = true;
  private screen = inject(ScreenState);
  private router = inject(Router);
  constructor() {
    this.router.events.subscribe((event: Event) => {
      if (this.isDrawer && event instanceof NavigationStart) {
        this.screen.toggleDrawer();
      }
    });
  }

  ngOnInit(): void {
    this.screen.mqAlias$().subscribe((mq: string[]) => {
      this.show = mq.includes('md') || mq.includes('lg') || mq.includes('xl');
    });
  }

  onToggle(): void {
    this.screen.toggleDrawer();
  }
}
