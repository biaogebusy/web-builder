import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import type { ICard1v5 } from '@core/interface/widgets/ICard';

@Component({
    selector: 'app-card-1v5',
    templateUrl: './card1v5.component.html',
    styleUrls: ['./card1v5.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class Card1v5Component {
  @Input() content: ICard1v5;
  constructor() {}

}
