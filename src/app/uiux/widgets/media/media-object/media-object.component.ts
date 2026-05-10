import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import type { IMediaObject } from '@core/interface/widgets/IMediaObject';

@Component({
    selector: 'app-media-object',
    templateUrl: './media-object.component.html',
    styleUrls: ['./media-object.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class MediaObjectComponent {
  @Input() content: IMediaObject;
  constructor() {}

}
