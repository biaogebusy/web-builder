import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { UserState } from '@core/mobx/user/UserState';
import { BaseComponent } from '@uiux/base/base.widget';

@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubMenuComponent extends BaseComponent implements OnInit {
  @Input() content: any;
  @ViewChild('childMenu', { static: true }) public childMenu: any;
  constructor(public userState: UserState) {
    super(userState);
  }

  ngOnInit(): void {}
}
