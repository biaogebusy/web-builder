import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IconComponent } from '@uiux/widgets/icon/icon.component';
import { LinkComponent } from '@uiux/widgets/link/link.component';
import { FixBarPopupComponent } from './fix-bar-popup/fix-bar-popup.component';

@Component({
  selector: 'app-fix-bar',
  templateUrl: './fix-bar.component.html',
  styleUrls: ['./fix-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, LinkComponent, FixBarPopupComponent],
})
export class FixBarComponent {
  readonly content = input<any[]>();
}
