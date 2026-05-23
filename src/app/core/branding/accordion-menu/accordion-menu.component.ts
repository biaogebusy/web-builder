import { ChangeDetectionStrategy, Component, Input, forwardRef } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { IMainMenu } from '@core/interface/branding/IBranding';
import { CheckChildMenuActiveDirective } from '@core/directive/check-child-menu-active.directive';
import { ReqRolesDirective } from '@core/directive/req-roles.directive';
import { IconComponent } from '@uiux/widgets/icon/icon.component';
import { LinkComponent } from '@uiux/widgets/link/link.component';
import { DynamicMenuComponent } from '../dynamic-menu/dynamic-menu.component';

@Component({
  selector: 'app-accordion-menu',
  templateUrl: './accordion-menu.component.html',
  styleUrls: ['./accordion-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatExpansionModule,
    MatListModule,
    CheckChildMenuActiveDirective,
    ReqRolesDirective,
    IconComponent,
    LinkComponent,
    DynamicMenuComponent,
    forwardRef(() => AccordionMenuComponent),
  ],
})
export class AccordionMenuComponent {
  @Input() content: IMainMenu[] | undefined;
  panelOpenState = false;
  constructor() {}
}
