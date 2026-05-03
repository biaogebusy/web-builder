import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import type { IBox } from '@core/interface/widgets/IBox';

@Component({
    selector: 'app-box',
    templateUrl: './box.component.html',
    styleUrls: ['./box.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class BoxComponent {
  @Input() content: IBox;
  constructor() {}

}
