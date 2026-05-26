import {
  Component,
  ChangeDetectionStrategy,
  input
} from '@angular/core';
import type { IHero2v2 } from '@core/interface/combs/IHero';
import { TextComponent } from '@uiux/widgets/text/text.component';

@Component({
  selector: 'app-hero-2v2',
  templateUrl: './hero2v2.component.html',
  styleUrls: ['./hero2v2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TextComponent],
})
export class Hero2v2Component {
  readonly content = input<IHero2v2>();
  constructor() {}
}
