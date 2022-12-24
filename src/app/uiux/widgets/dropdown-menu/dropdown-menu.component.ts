import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import type { IMainMenu } from '@core/interface/IBranding';
import { UserService } from '@core/service/user.service';
import { IUser } from '@core/interface/IUser';
import { USER } from '@core/token/token-providers';

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownMenuComponent implements OnInit {
  @Input() content: IMainMenu[] | undefined;
  panelOpenState = false;
  constructor(
    public userService: UserService,
    @Inject(USER) public user: IUser
  ) {}

  ngOnInit(): void {}
}
