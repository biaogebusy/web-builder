import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import { UserState } from '@core/mobx/user/UserState';
import { ScreenService } from '@core/service/screen.service';
import { BaseComponent } from '@uiux/base/base.widget';
import { IUser } from '@core/interface/IUser';
import { USER } from '@core/token/token-providers';

@Component({
  selector: 'app-item-menu',
  templateUrl: './item-menu.component.html',
  styleUrls: ['./item-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemMenuComponent extends BaseComponent implements OnInit {
  @Input() content: any;
  @Input() params: any;
  isMegaMenu: boolean;

  constructor(
    private screenService: ScreenService,
    public userState: UserState,
    @Inject(USER) public user: IUser
  ) {
    super(userState);
  }

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.isMegaMenu = !!this.params.isMegaMenu;
    }
  }
}
