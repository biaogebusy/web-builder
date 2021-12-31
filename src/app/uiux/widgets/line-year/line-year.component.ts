import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-line-year',
  templateUrl: './line-year.component.html',
  styleUrls: ['./line-year.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LineYearComponent implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}
}
