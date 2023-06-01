import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ISummaryItem } from '@core/interface/node/ISummaryItem';

@Component({
  selector: 'app-summary-item',
  templateUrl: './summary-item.component.html',
  styleUrls: ['./summary-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SummaryItemComponent implements OnInit {
  @Input() content: ISummaryItem;
  constructor() {}

  ngOnInit(): void {}
}
