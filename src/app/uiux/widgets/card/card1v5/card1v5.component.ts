import {
  ChangeDetectionStrategy,
  Component,
  input
} from '@angular/core';
import { ContenteditDirective } from '@core/directive/contentedit.directive';
import type { ICard1v5 } from '@core/interface/widgets/ICard';
import { IconComponent } from '../../icon/icon.component';
import { LinkComponent } from '../../link/link.component';

@Component({
  selector: 'app-card-1v5',
  templateUrl: './card1v5.component.html',
  styleUrls: ['./card1v5.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, LinkComponent, ContenteditDirective],
})
export class Card1v5Component {
  readonly content = input<ICard1v5>();
  constructor() {}

}
