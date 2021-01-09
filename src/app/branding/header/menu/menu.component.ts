import { Component, OnInit } from '@angular/core';
import { IUser } from '../../../mobx/user/IUser';
import { UserState } from '../../../mobx/user/UserState';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  constructor(
    public userState: UserState
  ) { }

  ngOnInit(): void {
  }

}
