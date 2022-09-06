import {
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { UserState } from '@core/mobx/user/UserState';

@Component({
  selector: 'app-iframe',
  templateUrl: './iframe.component.html',
  styleUrls: ['./iframe.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IframeComponent implements OnInit {
  @Input() content: any;
  url: string;
  constructor(private userState: UserState, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    if (!this.content?.url.includes(':id')) {
      this.url = this.content.url;
      this.cd.detectChanges();
      return;
    }
    if (this.userState.authenticated) {
      const id = this.userState.currentUser.current_user.uid;
      this.url = this.content.url.replace(':id', id);
    }
  }
}
