import { ChangeDetectionStrategy, Component, Input, OnInit, inject, signal } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { ReqRolesDirective } from '@core/directive/req-roles.directive';
import { ScreenService } from '@core/service/screen.service';
import type { IHeaderParams, IMainMenu } from '@core/interface/branding/IBranding';
import { LinkComponent } from '@uiux/widgets/link/link.component';
import { HoverMenuComponent } from './hover-menu/hover-menu.component';
import { SubMenuComponent } from './sub-menu/sub-menu.component';
import { MegaMenuComponent } from './mega-menu/mega-menu.component';
import { DynamicMenuComponent } from '../../../dynamic-menu/dynamic-menu.component';

@Component({
  selector: 'app-item-menu',
  templateUrl: './item-menu.component.html',
  styleUrls: ['./item-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatMenuModule,
    ReqRolesDirective,
    LinkComponent,
    HoverMenuComponent,
    SubMenuComponent,
    MegaMenuComponent,
    DynamicMenuComponent,
  ],
})
export class ItemMenuComponent implements OnInit {
  private screenService = inject(ScreenService);

  @Input() content: IMainMenu;
  @Input() params: IHeaderParams;
  public isMegaMenu = signal<boolean>(false);

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.isMegaMenu.set(!!this.params?.isMegaMenu);
    }
  }
}
