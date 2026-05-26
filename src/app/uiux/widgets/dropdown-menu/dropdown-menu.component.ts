import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import type { IDropdowMenu } from '@core/interface/widgets/IWidgets';
import { BtnComponent } from '../btn/btn.component';
import { DynamicComponentComponent } from '../builder/dynamic-component/dynamic-component.component';
import { IconComponent } from '../icon/icon.component';
import { LinkComponent } from '../link/link.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss'],
  imports: [
    MatButtonModule,
    MatMenuModule,
    BtnComponent,
    IconComponent,
    LinkComponent,
    DynamicComponentComponent,
  ],
})
export class DropdownMenuComponent {
  readonly content = input<IDropdowMenu>();
  constructor() {}

}
