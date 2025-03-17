import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import type { ICard } from '@core/interface/widgets/ICard';
@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class CardComponent implements OnInit {
  @Input() content: ICard;
  constructor() {}

  ngOnInit(): void {}
}
