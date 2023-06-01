import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import type { IShowcase2v5 } from '@core/interface/combs/IShowcase';

@Component({
  selector: 'app-showcase-2v5',
  templateUrl: './showcase2v5.component.html',
  styleUrls: ['./showcase2v5.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Showcase2v5Component implements OnInit {
  @Input() content: IShowcase2v5;
  constructor() {}

  ngOnInit(): void {}
}
