import { Component, Input, OnInit } from '@angular/core';
import type { ISummaryItem } from '@core/interface/node/ISummaryItem';

@Component({
  selector: 'app-summary-item',
  templateUrl: './summary-item.component.html',
  styleUrls: ['./summary-item.component.scss'],
})
export class SummaryItemComponent implements OnInit {
  @Input() content: ISummaryItem;

  ngOnInit(): void {}
}
