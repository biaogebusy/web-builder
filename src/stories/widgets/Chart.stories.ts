import { SafeHtmlPipe } from '../../app/core/pipe/safe-html.pipe';
import { ShareModule } from '../../app/share/share.module';
import {
  moduleMetadata,
  componentWrapperDecorator,
  Meta,
  Story,
} from '@storybook/angular';
import { WidgetsModule } from '../../app/uiux/widgets/widgets.module';
import { ChartComponent } from '@uiux/widgets/chart/chart.component';

export default {
  title: 'Widgets/Chart',
  component: ChartComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [ShareModule, WidgetsModule],
      providers: [SafeHtmlPipe],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div class="position-relative p-x p-y" style="z-index:1">${story}</div>`
    ),
  ],
} as Meta;

const Template: Story<ChartComponent> = (args) => ({
  component: ChartComponent,
  props: {
    ...args,
  },
});
export const Line = Template.bind({});

Line.args = {
  content: {
    chartType: 'line',
    data: {
      datasets: [
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
      ],
      labels: [
        '2022-7-24',
        '2022-7-25',
        '2022-7-26',
        '2022-7-28',
        '2022-7-29',
        '2022-7-30',
        '2022-7-31',
      ],
    },
  },
};

export const LineTime = Template.bind({});
LineTime.args = {
  content: {
    chartType: 'line',
    data: {
      datasets: [
        {
          data: [
            4, 6, 10, 13, 22, 23, 25, 34, 43, 45, 53, 62, 63, 75, 84, 93, 105,
            113, 122, 153, 155, 180, 223, 250,
          ],
          label: '红包趋势',
        },
      ],
      labels: [
        '9:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
        '18:00',
        '19:00',
        '20:00',
        '21:00',
        '22:00',
        '23:00',
        '24:00',
        '01:00',
        '02:00',
        '03:00',
        '04:00',
        '05:00',
        '06:00',
        '07:00',
        '08:00',
      ],
    },
  },
};

export const Bar = Template.bind({});

Bar.args = {
  content: {
    chartType: 'bar',
    data: {
      labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
      datasets: [
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
        { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {},
        y: {
          min: 10,
        },
      },
      plugins: {
        legend: {
          display: true,
        },
      },
    },
  },
};

export const Doughnut = Template.bind({});

Doughnut.args = {
  content: {
    chartType: 'doughnut',
    data: {
      labels: ['Johnson', 'Don', 'Wilian', 'UI'],
      datasets: [
        { data: [5663, 5663, 2831, 1875] },
        { data: [2284, 2284, 1142, 700] },
        { data: [2660, 2660, 1330, 700] },
      ],
    },
  },
};

export const Radar = Template.bind({});
Radar.args = {
  content: {
    chartType: 'radar',
    data: {
      labels: ['网站维护', 'Amigo', '云服务', '电子烟', '小程序'],
      datasets: [
        { data: [2000, 5663, 11868, 2636, 3200], label: 'Johnson' },
        { data: [1600, 5100, 9847, 2145, 2874], label: 'Don' },
        { data: [1000, 2831, 5934, 1318, 1491], label: 'Willian' },
        { data: [0, 1760, 700, 0, 375], label: 'UI' },
      ],
    },
  },
};

export const Pie = Template.bind({});
Pie.args = {
  content: {
    chartType: 'pie',
    data: {
      labels: ['Johnson', 'Don', 'Willian', 'UI'],
      datasets: [
        {
          data: [5663, 5100, 2831, 1760],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
      },
    },
  },
};

export const PolarArea = Template.bind({});
PolarArea.args = {
  content: {
    chartType: 'polarArea',
    data: {
      labels: ['Johnson', 'Don', 'Willian', 'UI'],
      datasets: [
        {
          data: [5663, 5100, 2831, 1760],
          label: 'Series 1',
        },
      ],
    },
  },
};

export const Bubble = Template.bind({});
Bubble.args = {
  content: {
    chartType: 'bubble',
    data: {
      labels: [],
      datasets: [
        {
          data: [
            { x: 10, y: 10, r: 10 },
            { x: 15, y: 5, r: 15 },
            { x: 26, y: 12, r: 23 },
            { x: 7, y: 8, r: 8 },
          ],
          label: 'Series A',
          backgroundColor: [
            'red',
            'green',
            'blue',
            'purple',
            'yellow',
            'brown',
            'magenta',
            'cyan',
            'orange',
            'pink',
          ],
          borderColor: 'blue',
          hoverBackgroundColor: 'purple',
          hoverBorderColor: 'red',
        },
      ],
    },
    options: {
      scales: {
        x: {
          min: 0,
          max: 30,
          ticks: {},
        },
        y: {
          min: 0,
          max: 30,
          ticks: {},
        },
      },
    },
  },
};

export const MixedChart = Template.bind({});
MixedChart.args = {
  content: {
    chartType: 'scatter',
    data: {
      labels: ['January', 'February', 'March', 'April'],
      datasets: [
        {
          type: 'bar',
          label: 'Bar Dataset',
          data: [10, 20, 30, 40],
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
        },
        {
          type: 'line',
          label: 'Line Dataset',
          data: [5, 15, 9, 16],
          fill: false,
          borderColor: 'rgb(54, 162, 235)',
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  },
};
