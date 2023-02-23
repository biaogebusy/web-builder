import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { IMainMenu } from '@core/interface/IBranding';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionComponent implements OnInit {
  @Input() content: IMainMenu[] | undefined;
  panelOpenState = false;
  constructor() {}

  ngOnInit(): void {}
}
