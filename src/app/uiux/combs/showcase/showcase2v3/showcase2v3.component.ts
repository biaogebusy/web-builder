import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import type { IShowcase2v3 } from '@core/interface/combs/IShowcase';

@Component({
  selector: 'app-showcase-2v3',
  templateUrl: './showcase2v3.component.html',
  styleUrls: ['./showcase2v3.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Showcase2v3Component implements OnInit {
  @Input() content: IShowcase2v3;
  constructor() {}

  ngOnInit(): void {}
}
