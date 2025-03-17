import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import type { IFixBarPopup } from '@core/interface/branding/IFixBarPopup';

@Component({
    selector: 'app-fix-bar-popup',
    templateUrl: './fix-bar-popup.component.html',
    styleUrls: ['./fix-bar-popup.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class FixBarPopupComponent {
  @Input() content: IFixBarPopup;
}
