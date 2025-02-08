import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { UtilitiesService } from '@core/service/utilities.service';
import { ScreenState } from '../../../state/screen/ScreenState';

@Component({
  selector: 'app-light',
  templateUrl: './light.component.html',
  styleUrls: ['./light.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LightComponent {
  screen = inject(ScreenState);
  utilities = inject(UtilitiesService);

  @Input() content: any;
}
