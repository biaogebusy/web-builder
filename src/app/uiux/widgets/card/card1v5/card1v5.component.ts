import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import type { ICard1v5 } from '@core/interface/widgets/ICard';

@Component({
  selector: 'app-card-1v5',
  templateUrl: './card1v5.component.html',
  styleUrls: ['./card1v5.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Card1v5Component implements OnInit {
  @Input() content: ICard1v5;
  constructor() {}

  ngOnInit(): void {}
}
