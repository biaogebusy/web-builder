import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import type { IShowcase2v4 } from '@core/interface/combs/IShowcase';

@Component({
  selector: 'app-showcase-2v4',
  templateUrl: './showcase2v4.component.html',
  styleUrls: ['./showcase2v4.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Showcase2v4Component implements OnInit {
  @Input() content: IShowcase2v4;
  constructor() {}

  ngOnInit(): void {}
}
