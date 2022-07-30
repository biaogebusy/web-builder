import {
  ChartConfiguration,
  ChartData,
  ChartOptions,
  ChartType,
} from 'chart.js';
export interface IChart {
  data: ChartData;
  options?: ChartOptions;
  chartType: ChartType;
  width?: string;
  height?: string;
  legend?: any;
}
