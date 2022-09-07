import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import type { IChart } from '@core/interface/widgets/IChart';
import { UtilitiesService } from '@core/service/utilities.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent implements OnInit {
  @Input() content: IChart;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {}
}
