import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import type { IIcon } from '@core/interface/widgets/IIcon';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
  host: {
    '[class.custom-icon]': '!!content?.svg',
  },
})
export class IconComponent {
  @Input() content: IIcon;
}
