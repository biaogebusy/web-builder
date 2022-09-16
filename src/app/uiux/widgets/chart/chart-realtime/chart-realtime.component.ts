import { Component, Input, OnInit } from '@angular/core';
import { IChart } from '@core/interface/widgets/IChart';
import { Chart, ChartDataset, ChartOptions } from 'chart.js';
import 'chartjs-adapter-luxon';
import StreamingPlugin from 'chartjs-plugin-streaming';
Chart.register(StreamingPlugin);

@Component({
  selector: 'app-chart-realtime',
  templateUrl: './chart-realtime.component.html',
  styleUrls: ['./chart-realtime.component.scss'],
})
export class ChartRealtimeComponent implements OnInit {
  content: IChart = {
    chartType: 'line',
    data: {
      datasets: [
        {
          label: 'Dataset 1',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderColor: 'rgb(255, 99, 132)',
          borderDash: [8, 4],
          fill: true,
          data: [],
        },
        {
          label: 'Dataset 2',
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgb(54, 162, 235)',
          cubicInterpolationMode: 'monotone',
          fill: true,
          data: [],
        },
      ],
    },
    options: {
      scales: {
        x: {
          type: 'realtime',
          realtime: {
            delay: 2000,
            onRefresh: (chart: Chart) => {
              chart.data.datasets.forEach((dataset: ChartDataset) => {
                dataset.data.push({
                  x: Date.now(),
                  y: Math.random(),
                });
              });
            },
          },
        },
      },
    },
  };
  constructor() {}

  ngOnInit(): void {}
}
