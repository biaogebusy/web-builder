import {
  ChangeDetectionStrategy,
  Component,
  input
} from '@angular/core';
import type { IShowcase2v2 } from '@core/interface/combs/IShowcase';
import { CardComponent } from '@uiux/widgets/card/card.component';
import { TextComponent } from '@uiux/widgets/text/text.component';

@Component({
  selector: 'app-showcase-2v2',
  templateUrl: './showcase2v2.component.html',
  styleUrls: ['./showcase2v2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TextComponent, CardComponent],
})
export class Showcase2v2Component {
  readonly content = input<IShowcase2v2>();
  constructor() {}

}
