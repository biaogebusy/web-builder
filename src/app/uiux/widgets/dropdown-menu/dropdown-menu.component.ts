import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import type { IMainMenu } from '@core/interface/IBranding';

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownMenuComponent implements OnInit {
  @Input() content: IMainMenu[] | undefined;
  panelOpenState = false;
  constructor() {}

  ngOnInit(): void {}
}
