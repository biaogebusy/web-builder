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
          data: [65, 59, 80, 81, 56, 55, 40],
          label: 'Series A',
          backgroundColor: 'rgba(148,159,177,0.2)',
          borderColor: 'rgba(148,159,177,1)',
          pointBackgroundColor: 'rgba(148,159,177,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(148,159,177,0.8)',
          fill: 'origin',
        },
        {
          data: [28, 48, 40, 19, 86, 27, 90],
          label: 'Series B',
          backgroundColor: 'rgba(77,83,96,0.2)',
          borderColor: 'rgba(77,83,96,1)',
          pointBackgroundColor: 'rgba(77,83,96,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(77,83,96,1)',
          fill: 'origin',
        },
        {
          data: [180, 480, 770, 90, 1000, 270, 400],
          label: 'Series C',
          yAxisID: 'y-axis-1',
          backgroundColor: 'rgba(255,0,0,0.3)',
          borderColor: 'red',
          pointBackgroundColor: 'rgba(148,159,177,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(148,159,177,0.8)',
          fill: 'origin',
        },
      ],
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    },
    options: {
      elements: {
        line: {
          tension: 0.5,
        },
      },
      scales: {
        // We use this empty structure as a placeholder for dynamic theming.
        x: {},
        'y-axis-0': {
          position: 'left',
        },
        'y-axis-1': {
          position: 'right',
          grid: {
            color: 'rgba(255,0,0,0.3)',
          },
          ticks: {
            color: 'red',
          },
        },
      },
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
        datalabels: {
          anchor: 'end',
          align: 'end',
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
