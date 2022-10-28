import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import type { IShowcase3v6 } from '@core/interface/combs/IShowcase';
import type { IUser } from '@core/interface/IUser';
import { USER } from '@core/token/token-providers';
import { BaseComponent } from '@uiux/base/base.widget';

@Component({
  selector: 'app-showcase3v6',
  templateUrl: './showcase3v6.component.html',
  styleUrls: ['./showcase3v6.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Showcase3v6Component extends BaseComponent implements OnInit {
  @Input() content: IShowcase3v6;
  constructor(@Inject(USER) public user: IUser) {
    super();
  }

  ngOnInit(): void {}
}
