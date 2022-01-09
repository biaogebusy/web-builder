import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { IBg } from '@core/interface/widgets/IBg';

@Component({
  selector: 'app-bg',
  templateUrl: './bg.component.html',
  styleUrls: ['./bg.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BgComponent implements OnInit {
  @Input() content: IBg;
  constructor() {}

  ngOnInit(): void {}
}
