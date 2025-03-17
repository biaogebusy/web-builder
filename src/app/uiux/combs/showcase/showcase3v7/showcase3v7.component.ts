import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import type { IShowcase3v7 } from '@core/interface/combs/IShowcase';

@Component({
    selector: 'app-showcase-3v7',
    templateUrl: './showcase3v7.component.html',
    styleUrls: ['./showcase3v7.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class Showcase3v7Component implements OnInit {
  @Input() content: IShowcase3v7;
  constructor() {}

  ngOnInit(): void {}
}
