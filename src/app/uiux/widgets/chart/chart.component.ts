import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IChart } from '@core/interface/widgets/IChart';
import { UtilitiesService } from '@core/service/utilities.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  @Input() content: IChart;
  form = new FormGroup({});
  model: any;
  data: any;

  constructor(private util: UtilitiesService) {}

  ngOnInit(): void {}

  onModelChange(value: any): any {
    console.log(value);
    if (value.date.start && value.date.end) {
      const labels = this.util.getDatesInRange(
        value.date.start,
        value.date.end,
        'MM-dd'
      );
      const datasets = [
        {
          data: [4, 3, 5, 3, 2, 3, 5],
          label: '张三',
        },
        {
          data: [1, 2, 4, 7, 3, 2, 6],
          label: '李四',
        },
        {
          data: [2, 4, 3, 7, 5, 1, 1],
          label: '王五',
        },
      ];
      console.log(labels);
      this.data = {
        labels,
        datasets,
      };
    }
  }
}
