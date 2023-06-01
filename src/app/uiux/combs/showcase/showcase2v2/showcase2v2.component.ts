import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import type { IShowcase2v2 } from '@core/interface/combs/IShowcase';

@Component({
  selector: 'app-showcase-2v2',
  templateUrl: './showcase2v2.component.html',
  styleUrls: ['./showcase2v2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Showcase2v2Component implements OnInit {
  @Input() content: IShowcase2v2;
  constructor() {}

  ngOnInit(): void {}
}
