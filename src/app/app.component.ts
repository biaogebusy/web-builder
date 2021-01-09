import { Component, OnInit } from '@angular/core';
import { UserState } from './mobx/user/UserState';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  authenticated: boolean;
  constructor(
    public userState: UserState
  ) {
    this.authenticated = false;
  }

  ngOnInit() {
  }
}
