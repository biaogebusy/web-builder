import { AsyncPipe } from '@angular/common';
import {
  Component,
  OnInit,
  Input,
  inject,
  ChangeDetectionStrategy,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Event, NavigationStart, Router } from '@angular/router';
import type { IBranding } from '@core/interface/branding/IBranding';
import { ScreenState } from '@core/state/screen/ScreenState';
import { BRANDING, CORE_CONFIG } from '@core/token/token-providers';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import { Observable } from 'rxjs';
import { LogoComponent } from '@uiux/widgets/img/logo/logo.component';
import { LinkComponent } from '@uiux/widgets/link/link.component';
import { NotifyComponent } from '@uiux/widgets/notify/notify.component';
import { SwitchThemeComponent } from '@uiux/widgets/switch-theme/switch-theme.component';
import { UserMenuComponent } from '@uiux/widgets/user-menu/user-menu.component';
import { LangSwitchComponent } from '@uiux/widgets/lang-switch/lang-switch.component';
import { ItemMenuComponent } from './item-menu/item-menu.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { AccordionMenuComponent } from '../../accordion-menu/accordion-menu.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    LogoComponent,
    LinkComponent,
    NotifyComponent,
    SwitchThemeComponent,
    UserMenuComponent,
    LangSwitchComponent,
    ItemMenuComponent,
    SearchBoxComponent,
    AccordionMenuComponent,
  ],
})
export class MenuComponent implements OnInit {
  @Input() isDrawer: boolean;
  public coreConfig = inject<ICoreConfig>(CORE_CONFIG);
  public branding$ = inject<Observable<IBranding>>(BRANDING);
  public show = signal<boolean>(true);
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
      switch (mq[0]) {
        case 'xs':
        case 'sm':
          this.show.set(false);
          break;
        default:
          this.show.set(true);
          break;
      }
    });
  }

  onToggle(): void {
    this.screen.toggleDrawer();
  }
}
