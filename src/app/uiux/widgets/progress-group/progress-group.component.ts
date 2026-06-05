import {
  ChangeDetectionStrategy,
  Component,
  input
} from '@angular/core';
import type { IProgressGroup } from '@core/interface/widgets/IWidgets';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';

@Component({
  selector: 'app-progress-group',
  templateUrl: './progress-group.component.html',
  styleUrls: ['./progress-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProgressBarComponent],
})
export class ProgressGroupComponent {
  readonly content = input<IProgressGroup>();
  constructor() {}

}
