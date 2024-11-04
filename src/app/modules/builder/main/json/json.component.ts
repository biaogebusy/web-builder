import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { IJSON } from '@core/interface/IBuilder';
import { ScreenService } from '@core/service/screen.service';

@Component({
  selector: 'app-json',
  templateUrl: './json.component.html',
  styleUrl: './json.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JsonComponent {
  @Input() content: IJSON;

  screenSerivce = inject(ScreenService);
}
