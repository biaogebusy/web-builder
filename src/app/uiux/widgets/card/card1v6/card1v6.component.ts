import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import type { ICard1v6 } from '@core/interface/widgets/ICard';

@Component({
  selector: 'app-card-1v6',
  templateUrl: './card1v6.component.html',
  styleUrls: ['./card1v6.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Card1v6Component implements OnInit {
  @Input() content: ICard1v6;
  constructor() {}

  ngOnInit(): void {}
}
