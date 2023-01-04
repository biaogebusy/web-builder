import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { USER } from '@core/token/token-providers';
import type { IUser } from '@core/interface/IUser';
import { UserService } from '@core/service/user.service';

@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubMenuComponent implements OnInit {
  @Input() content: any;
  @ViewChild('childMenu', { static: true }) public childMenu: any;
  constructor(
    @Inject(USER) public user: IUser,
    public userSerivice: UserService
  ) {}

  trackByFn(index: number, item: any): number {
    return index;
  }

  ngOnInit(): void {}
}
