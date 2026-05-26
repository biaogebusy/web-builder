import {
  ChangeDetectionStrategy,
  Component,
  input
} from '@angular/core';
import type { IShowcase3v4 } from '@core/interface/combs/IShowcase';
import { BoxComponent } from '@uiux/widgets/box/box.component';
import { ImgComponent } from '@uiux/widgets/img/img.component';
import { TitleComponent } from '@uiux/widgets/title/title.component';

@Component({
  selector: 'app-showcase-3v4',
  templateUrl: './showcase3v4.component.html',
  styleUrls: ['./showcase3v4.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TitleComponent, BoxComponent, ImgComponent],
})
export class Showcase3v4Component {
  readonly content = input<IShowcase3v4>();
  constructor() {}

}
