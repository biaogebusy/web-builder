import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
  AfterViewInit,
} from '@angular/core';
import { IJSON } from '@core/interface/IBuilder';
import { ScreenService } from '@core/service/screen.service';

@Component({
  selector: 'app-json',
  templateUrl: './json.component.html',
  styleUrl: './json.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JsonComponent implements AfterViewInit {
  @Input() content: IJSON;

  screenSerivce = inject(ScreenService);

  ngAfterViewInit(): void {}
}
