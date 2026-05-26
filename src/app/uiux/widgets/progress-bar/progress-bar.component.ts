import {
  ChangeDetectionStrategy,
  Component,
  input
} from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import type { IProgressBar } from '@core/interface/widgets/IWidgets';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatProgressBarModule],
})
export class ProgressBarComponent {
  readonly content = input<IProgressBar>();
  constructor() {}

}
