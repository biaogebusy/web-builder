import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import type { IFixBarPopup } from '@core/interface/branding/IFixBarPopup';
import { TextComponent } from '@uiux/widgets/text/text.component';

@Component({
  selector: 'app-fix-bar-popup',
  templateUrl: './fix-bar-popup.component.html',
  styleUrls: ['./fix-bar-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TextComponent],
})
export class FixBarPopupComponent {
  @Input() content: IFixBarPopup;
}
