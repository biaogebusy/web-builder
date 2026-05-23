import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import type { IMediaList } from '@core/interface/widgets/IMediaList';
import { SafeHtmlPipe } from '@core/pipe/safe-html.pipe';
import { ImgComponent } from '../../img/img.component';
import { LinkComponent } from '../../link/link.component';

@Component({
  selector: 'app-media-list',
  templateUrl: './media-list.component.html',
  styleUrls: ['./media-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, ImgComponent, LinkComponent, SafeHtmlPipe],
})
export class MediaListComponent {
  @Input() content: IMediaList;
  constructor() {}

}
