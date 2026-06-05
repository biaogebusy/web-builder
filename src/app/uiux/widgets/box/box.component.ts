import {
  ChangeDetectionStrategy,
  Component,
  input
} from '@angular/core';
import { ContenteditDirective } from '@core/directive/contentedit.directive';
import type { IBox } from '@core/interface/widgets/IBox';
import { SafeHtmlPipe } from '@core/pipe/safe-html.pipe';
import { IconComponent } from '../icon/icon.component';
import { ImgComponent } from '../img/img.component';
import { LinkComponent } from '../link/link.component';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, ImgComponent, LinkComponent, ContenteditDirective, SafeHtmlPipe],
})
export class BoxComponent {
  readonly content = input<IBox>();
  constructor() {}

}
