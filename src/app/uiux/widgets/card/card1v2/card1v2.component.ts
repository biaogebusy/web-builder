import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import type { ICard1v2 } from '@core/interface/widgets/ICard';

@Component({
    selector: 'app-card-1v2',
    templateUrl: './card1v2.component.html',
    styleUrls: ['./card1v2.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class Card1v2Component implements OnInit {
  @Input() content: ICard1v2;
  constructor() {}

  ngOnInit(): void {}
}
