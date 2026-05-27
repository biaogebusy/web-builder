import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { UtilitiesService } from '@core/service/utilities.service';
import { SafeHtmlPipe } from '@core/pipe/safe-html.pipe';
import { ScreenState } from '../../../state/screen/ScreenState';
import { MenuItemComponent } from '../menu-item/menu-item.component';

@Component({
  selector: 'app-light',
  templateUrl: './light.component.html',
  styleUrls: ['./light.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SafeHtmlPipe, MenuItemComponent],
})
export class LightComponent {
  screen = inject(ScreenState);
  utilities = inject(UtilitiesService);

  readonly content = input.required<any>();
}
