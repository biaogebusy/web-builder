import {
  ChangeDetectionStrategy,
  Component,
  input
} from '@angular/core';
import { ContenteditDirective } from '@core/directive/contentedit.directive';
import type { ICard1v2 } from '@core/interface/widgets/ICard';
import { SafeHtmlPipe } from '@core/pipe/safe-html.pipe';
import { BgImgComponent } from '../../bg-img/bg-img.component';
import { ImgComponent } from '../../img/img.component';
import { LinkComponent } from '../../link/link.component';

@Component({
  selector: 'app-card-1v2',
  templateUrl: './card1v2.component.html',
  styleUrls: ['./card1v2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BgImgComponent, ImgComponent, LinkComponent, ContenteditDirective, SafeHtmlPipe],
})
export class Card1v2Component {
  readonly content = input<ICard1v2>();
  constructor() {}

}
