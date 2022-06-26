import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { IDropdownMenu } from '@core/interface/widgets/IDropdownMenu';
import { IMainMenu } from '@core/mobx/IBranding';

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownMenuComponent implements OnInit {
  @Input() content: IMainMenu[];
  panelOpenState = false;
  constructor() {}

  ngOnInit(): void {}
}
