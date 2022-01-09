import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ILineYear } from '@core/interface/widgets/ILineYear';

@Component({
  selector: 'app-line-year',
  templateUrl: './line-year.component.html',
  styleUrls: ['./line-year.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LineYearComponent implements OnInit {
  @Input() content: ILineYear;
  constructor() {}

  ngOnInit(): void {}
}
