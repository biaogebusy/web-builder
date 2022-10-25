import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import type { IShowcase2v1 } from '@core/interface/combs/IShowcase';
@Component({
  selector: 'app-showcase2v1',
  templateUrl: './showcase2v1.component.html',
  styleUrls: ['./showcase2v1.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Showcase2v1Component implements OnInit {
  @Input() content: IShowcase2v1;
  constructor() {}

  ngOnInit(): void {}
}
