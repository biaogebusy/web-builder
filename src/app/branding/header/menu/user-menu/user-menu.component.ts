import { Component, OnInit } from '@angular/core';
import { UserState } from 'src/app/mobx/user/UserState';
import { UtilitiesService } from 'src/app/service/utilities.service';
import { ScreenState } from '../../../../mobx/screen/ScreenState';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
})
export class UserMenuComponent implements OnInit {
  constructor(
    public userState: UserState,
    public utilities: UtilitiesService,
    public screen: ScreenState
  ) {}

  ngOnInit(): void {}

  logout(): void {
    this.userState.logout();
  }
}
