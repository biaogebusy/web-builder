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
  constructor(private util: UtilitiesService) {}

  ngOnInit(): void {}

  onModelChange(value: any): any {
    console.log(value);
    if (value.date.start && value.date.end) {
      const labels = this.util.getDatesInRange(
        value.date.start,
        value.date.end
      );
      console.log(labels);
    }
  }
}
