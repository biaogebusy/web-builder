import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import type { IMediaObjectGroup } from '@core/interface/widgets/IMediaObject';
import { MediaObjectComponent } from '../media-object/media-object.component';

@Component({
  selector: 'app-media-object-group',
  templateUrl: './media-object-group.component.html',
  styleUrls: ['./media-object-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MediaObjectComponent],
})
export class MediaObjectGroupComponent {
  @Input() content: IMediaObjectGroup;
  constructor() {}

}
