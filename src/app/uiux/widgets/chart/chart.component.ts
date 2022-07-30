import { Component, Input, OnInit } from '@angular/core';
import { IChart } from '@core/interface/widgets/IChart';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  @Input() content: IChart;
  constructor() {}

  ngOnInit(): void {}
}
