import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import type { ITextHero } from '@core/interface/widgets/IText';
import { TextComponent } from '@uiux/widgets/text/text.component';

@Component({
  selector: 'app-hero-2v1',
  templateUrl: './hero2v1.component.html',
  styleUrls: ['./hero2v1.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TextComponent],
})
export class Hero2v1Component {
  @Input() content: ITextHero;
  constructor() {}
}
