import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import type { EChartsOption } from 'echarts/types/dist/shared';
import { isArray } from 'lodash-es';
import * as echarts from 'echarts/core';
import {
  GridComponent,
  TitleComponent,
  LegendComponent,
  TooltipComponent,
  DatasetComponent,
  TransformComponent,
  GraphicComponent,
} from 'echarts/components';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import {
  BarChart,
  LineChart,
  PieChart,
  ScatterChart,
  RadarChart,
  MapChart,
  CandlestickChart,
  GraphChart,
  TreeChart,
  SunburstChart,
  SankeyChart,
  FunnelChart,
  GaugeChart,
  ThemeRiverChart,
} from 'echarts/charts';

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent,
  BarChart,
  LineChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
  PieChart,
  ScatterChart,
  RadarChart,
  MapChart,
  CandlestickChart,
  GraphChart,
  GraphicComponent,
  TreeChart,
  SunburstChart,
  SankeyChart,
  FunnelChart,
  GaugeChart,
  ThemeRiverChart,
]);

// Import the theme
import { ScreenService } from '@core/service/screen.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  standalone: false,
})
export class ChartComponent implements OnInit, AfterViewInit {
  @Input() content: EChartsOption;
  @Input() data: any;
  @Input() style: any;
  @ViewChild('echarts', { read: ElementRef }) echarts: ElementRef;

  private theme = signal<object>({});
  private screenService = inject(ScreenService);

  ngOnInit(): void {
    this.theme.set(
      Object.assign(
        {
          color: ['#2E9BFF', '#987BE9', '#FAA16F', '#9DD094', '#FF6461'],
        },
        this.data?.theme
      )
    );
  }

  ngAfterViewInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      const chart = echarts.init(this.echarts.nativeElement, this.theme());
      chart.setOption(this.content);
    }
  }

  onChange(chart: any): void {
    if (isArray(this.content.series)) {
      this.content.series.forEach((item: any) => {
        item.type = chart.value;
      });
      this.content = { ...this.content };
    }
  }
}
