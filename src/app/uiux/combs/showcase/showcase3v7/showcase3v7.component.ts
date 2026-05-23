import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import type { IShowcase3v7 } from '@core/interface/combs/IShowcase';
import { BoxComponent } from '@uiux/widgets/box/box.component';
import { ImgComponent } from '@uiux/widgets/img/img.component';
import { TextComponent } from '@uiux/widgets/text/text.component';

@Component({
  selector: 'app-showcase-3v7',
  templateUrl: './showcase3v7.component.html',
  styleUrls: ['./showcase3v7.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TextComponent, BoxComponent, ImgComponent],
})
export class Showcase3v7Component {
  @Input() content: IShowcase3v7;
  constructor() {}

}
