import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IMainMenu } from '@core/interface/branding/IBranding';

@Component({
  selector: 'app-accordion-menu',
  templateUrl: './accordion-menu.component.html',
  styleUrls: ['./accordion-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class AccordionMenuComponent implements OnInit {
  @Input() content: IMainMenu[] | undefined;
  panelOpenState = false;
  constructor() {}

  ngOnInit(): void {}
}
