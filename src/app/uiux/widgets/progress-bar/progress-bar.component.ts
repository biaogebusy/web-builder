import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import type { IProgressBar } from '@core/interface/widgets/IWidgets';

@Component({
    selector: 'app-progress-bar',
    templateUrl: './progress-bar.component.html',
    styleUrls: ['./progress-bar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ProgressBarComponent {
  @Input() content: IProgressBar;
  constructor() {}

}
