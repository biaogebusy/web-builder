import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewChild,
  forwardRef,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ReqRolesDirective } from '@core/directive/req-roles.directive';
import { LinkComponent } from '@uiux/widgets/link/link.component';

@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatIconModule,
    MatMenuModule,
    ReqRolesDirective,
    LinkComponent,
    forwardRef(() => SubMenuComponent),
  ],
})
export class SubMenuComponent {
  @Input() content: any;
  @ViewChild('childMenu', { static: true }) public childMenu: any;
}
