import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IMainMenu } from '@core/interface/branding/IBranding';

@Component({
  selector: 'app-accordion-menu',
  templateUrl: './accordion-menu.component.html',
  styleUrls: ['./accordion-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class AccordionMenuComponent {
  @Input() content: IMainMenu[] | undefined;
  panelOpenState = false;
  constructor() {}

}
