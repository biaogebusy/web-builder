import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';

@Component({
    selector: 'app-spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class SpinnerComponent {
  @Input() content: any;
  constructor() {}

}
