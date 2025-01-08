import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import type { EChartsOption } from 'echarts';
import { isArray } from 'lodash-es';
import * as echarts from 'echarts/core';
import { BarChart, LineChart, PieChart } from 'echarts/charts';
import {
  TitleComponent as TitleEchartsComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent,
} from 'echarts/components';
// Features like Universal Transition and Label Layout
import { LabelLayout, UniversalTransition } from 'echarts/features';
// Import the Canvas renderer
// Note that including the CanvasRenderer or SVGRenderer is a required step
import { CanvasRenderer } from 'echarts/renderers';
// Import the theme
import { ScreenService } from '@core/service/screen.service';
// Register the required components
echarts.use([
  BarChart,
  LineChart,
  PieChart,
  TitleEchartsComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
  LegendComponent,
]);
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent implements OnInit, AfterViewInit {
  @Input() content: EChartsOption;
  theme: any;
  @Input() data: any;
  @Input() style: any;
  @ViewChild('echarts', { read: ElementRef }) echarts: ElementRef;
  cd = inject(ChangeDetectorRef);
  screenService = inject(ScreenService);

  ngOnInit(): void {
    this.theme = Object.assign(
      {
        color: ['#2E9BFF', '#987BE9', '#FAA16F', '#9DD094', '#FF6461'],
      },
      this.data?.theme
    );
  }

  ngAfterViewInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      const chart = echarts.init(this.echarts.nativeElement, this.theme);
      chart.setOption(this.content);
      this.cd.detectChanges();
    }
  }

  onChange(chart: any): void {
    if (isArray(this.content.series)) {
      this.content.series.forEach(item => {
        item.type = chart.value;
      });
      this.content = { ...this.content };
      this.cd.detectChanges();
    }
  }
}
