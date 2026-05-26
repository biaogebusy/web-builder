import {
  ChangeDetectionStrategy,
  Component,
  input
} from '@angular/core';
import { ContenteditDirective } from '@core/directive/contentedit.directive';
import type { IContentTextCenter } from '@core/interface/widgets/IContentWidget';
import { SafeHtmlPipe } from '@core/pipe/safe-html.pipe';
import { ImgComponent } from '../img/img.component';

@Component({
  selector: 'app-content-text-center',
  templateUrl: './content-text-center.component.html',
  styleUrls: ['./content-text-center.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ImgComponent, ContenteditDirective, SafeHtmlPipe],
})
export class ContentTextCenterComponent {
  readonly content = input<IContentTextCenter>();
  constructor() {}

}
