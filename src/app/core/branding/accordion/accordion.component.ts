import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { IMainMenu } from '@core/interface/branding/IBranding';

@Component({
    selector: 'app-accordion',
    templateUrl: './accordion.component.html',
    styleUrls: ['./accordion.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class AccordionComponent implements OnInit {
  @Input() content: IMainMenu[] | undefined;
  panelOpenState = false;
  constructor() {}

  ngOnInit(): void {}
}
