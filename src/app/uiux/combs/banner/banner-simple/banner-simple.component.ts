import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { UserState } from '@core/mobx/user/UserState';
import { BaseComponent } from '@uiux/base/base.widget';

@Component({
  selector: 'app-banner-simple',
  templateUrl: './banner-simple.component.html',
  styleUrls: ['./banner-simple.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BannerSimpleComponent extends BaseComponent implements OnInit {
  @Input() content: any;
  constructor(public userState: UserState) {
    super(userState);
  }

  ngOnInit(): void {}
}
