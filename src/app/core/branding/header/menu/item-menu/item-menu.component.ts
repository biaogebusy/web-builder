import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import { ScreenService } from '@core/service/screen.service';
import { BaseComponent } from '@uiux/base/base.widget';
import type { IUser } from '@core/interface/IUser';
import { USER } from '@core/token/token-providers';
import type { IHeaderParams, IMainMenu } from '@core/interface/IBranding';

@Component({
  selector: 'app-item-menu',
  templateUrl: './item-menu.component.html',
  styleUrls: ['./item-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemMenuComponent extends BaseComponent implements OnInit {
  @Input() content: IMainMenu;
  @Input() params: IHeaderParams;
  isMegaMenu: boolean;

  constructor(
    private screenService: ScreenService,
    @Inject(USER) public user: IUser
  ) {
    super();
  }

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.isMegaMenu = !!this.params.isMegaMenu;
    }
  }
}
