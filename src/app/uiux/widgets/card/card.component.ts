import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import type { ICard } from '@core/interface/widgets/ICard';
@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class CardComponent {
  @Input() content: ICard;
  constructor() {}

}
