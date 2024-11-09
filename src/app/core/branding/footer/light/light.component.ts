import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UtilitiesService } from '@core/service/utilities.service';
import { ScreenState } from '../../../state/screen/ScreenState';

@Component({
  selector: 'app-light',
  templateUrl: './light.component.html',
  styleUrls: ['./light.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LightComponent {
  @Input() content: any;
  constructor(
    public screen: ScreenState,
    public utilities: UtilitiesService
  ) {}
}
