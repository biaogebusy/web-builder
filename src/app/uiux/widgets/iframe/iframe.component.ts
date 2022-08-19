import { Component, Input, OnInit } from '@angular/core';
import { UserState } from '@core/mobx/user/UserState';

@Component({
  selector: 'app-iframe',
  templateUrl: './iframe.component.html',
  styleUrls: ['./iframe.component.scss'],
})
export class IframeComponent implements OnInit {
  @Input() content: any;
  url: string;
  constructor(private userState: UserState) {}

  ngOnInit(): void {
    if (!this.content?.url.includes(':id')) {
      this.url = this.content.url;
      return;
    }
    if (this.userState.authenticated) {
      const id = this.userState.currentUser.current_user.uid;
      this.url = this.content.url.replace(':id', id);
    }
  }
}
