import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-summary-item',
  templateUrl: './summary-item.component.html',
  styleUrls: ['./summary-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SummaryItemComponent implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}
}
