import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { UserState } from '@core/mobx/user/UserState';
import { BaseComponent } from '@uiux/base/base.widget';

@Component({
  selector: 'app-taxonomy-thin-list',
  templateUrl: './taxonomy-thin-list.component.html',
  styleUrls: ['./taxonomy-thin-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaxonomyThinListComponent extends BaseComponent implements OnInit {
  @Input() content: any;
  constructor(public userState: UserState) {
    super(userState);
  }

  ngOnInit(): void {}
}
