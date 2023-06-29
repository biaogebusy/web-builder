import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import type { IShowcase3v5 } from '@core/interface/combs/IShowcase';

@Component({
  selector: 'app-showcase-3v5',
  templateUrl: './showcase3v5.component.html',
  styleUrls: ['./showcase3v5.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Showcase3v5Component implements OnInit {
  @Input() content: IShowcase3v5;
  constructor() {}

  ngOnInit(): void {}
}
