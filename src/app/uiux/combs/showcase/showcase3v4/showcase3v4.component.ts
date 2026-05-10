import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import type { IShowcase3v4 } from '@core/interface/combs/IShowcase';

@Component({
    selector: 'app-showcase-3v4',
    templateUrl: './showcase3v4.component.html',
    styleUrls: ['./showcase3v4.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class Showcase3v4Component {
  @Input() content: IShowcase3v4;
  constructor() {}

}
