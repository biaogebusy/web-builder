import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import type { IContentTextCenter } from '@core/interface/widgets/IContentWidget';

@Component({
    selector: 'app-content-text-center',
    templateUrl: './content-text-center.component.html',
    styleUrls: ['./content-text-center.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ContentTextCenterComponent {
  @Input() content: IContentTextCenter;
  constructor() {}

}
