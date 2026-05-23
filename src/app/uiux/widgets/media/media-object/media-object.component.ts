import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import { ContenteditDirective } from '@core/directive/contentedit.directive';
import type { IMediaObject } from '@core/interface/widgets/IMediaObject';
import { SafeHtmlPipe } from '@core/pipe/safe-html.pipe';
import { IconComponent } from '../../icon/icon.component';
import { ImgComponent } from '../../img/img.component';
import { LinkComponent } from '../../link/link.component';

@Component({
  selector: 'app-media-object',
  templateUrl: './media-object.component.html',
  styleUrls: ['./media-object.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ImgComponent, IconComponent, LinkComponent, ContenteditDirective, SafeHtmlPipe],
})
export class MediaObjectComponent {
  @Input() content: IMediaObject;
  constructor() {}

}
