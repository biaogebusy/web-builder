import { Component, Input, OnInit } from '@angular/core';
import type { ISummary } from '@core/interface/node/IRelate';

@Component({
    selector: 'app-summary',
    templateUrl: './summary.component.html',
    styleUrls: ['./summary.component.scss'],
    standalone: false
})
export class SummaryComponent implements OnInit {
  @Input() content: ISummary;

  ngOnInit(): void {}
}
