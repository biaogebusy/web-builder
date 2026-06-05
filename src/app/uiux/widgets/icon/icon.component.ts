import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import type { IIcon } from '@core/interface/widgets/IIcon';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, MatBadgeModule],
  host: {
    '[class.custom-icon]': '!!content()?.svg',
  },
})
export class IconComponent {
  readonly content = input<IIcon>();
}
