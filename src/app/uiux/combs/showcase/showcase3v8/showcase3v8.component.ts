import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import type { IShowcase3v8 } from '@core/interface/combs/IShowcase';
import { BaseComponent } from '@uiux/base/base.widget';

@Component({
  selector: 'app-showcase-3v8',
  templateUrl: './showcase3v8.component.html',
  styleUrls: ['./showcase3v8.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Showcase3v8Component extends BaseComponent implements OnInit {
  @Input() content: IShowcase3v8;
  constructor() {
    super();
  }

  ngOnInit(): void {}
}
