import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import { ScreenService } from '@core/service/screen.service';
import type { IUser } from '@core/interface/IUser';
import { USER } from '@core/token/token-providers';
import type { IHeaderParams, IMainMenu } from '@core/interface/IBranding';
import { UserService } from '@core/service/user.service';

@Component({
  selector: 'app-item-menu',
  templateUrl: './item-menu.component.html',
  styleUrls: ['./item-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemMenuComponent implements OnInit {
  @Input() content: IMainMenu;
  @Input() params: IHeaderParams;
  isMegaMenu: boolean;

  constructor(
    private screenService: ScreenService,
    public userSerivice: UserService,
    @Inject(USER) public user: IUser
  ) {}

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.isMegaMenu = !!this.params.isMegaMenu;
    }
  }
}
