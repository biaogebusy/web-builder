import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { IProgressGroup } from '@core/interface/widgets/IWidgets';

@Component({
  selector: 'app-progress-group',
  templateUrl: './progress-group.component.html',
  styleUrls: ['./progress-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressGroupComponent implements OnInit {
  @Input() content: IProgressGroup;
  constructor() {}

  ngOnInit(): void {}
}
