import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import type { IMediaList } from '@core/interface/widgets/IMediaList';

@Component({
    selector: 'app-media-list',
    templateUrl: './media-list.component.html',
    styleUrls: ['./media-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class MediaListComponent {
  @Input() content: IMediaList;
  constructor() {}

}
