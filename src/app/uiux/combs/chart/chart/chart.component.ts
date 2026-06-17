import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  inject,
  signal,
  ChangeDetectionStrategy,
  input,
  viewChild,
  DestroyRef,
  DOCUMENT,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
import { ConfigService } from '@core/service/config.service';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { IconComponent } from '@uiux/widgets/icon/icon.component';

// Hardcoded fallback for SSR or when the Material sys tokens can't be read.
const FALLBACK_PALETTE = ['#2E9BFF', '#987BE9', '#FAA16F', '#9DD094', '#FF6461'];
// Palette sourced from --mat-sys-* tokens so it follows light/dark theme switches.
const SYS_PALETTE_VARS = [
  '--mat-sys-primary',
  '--mat-sys-tertiary',
  '--mat-sys-secondary',
  '--mat-sys-error',
  '--mat-sys-primary-fixed',
  '--mat-sys-tertiary-fixed',
];

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  imports: [MatButtonToggleModule, IconComponent],
})
export class ChartComponent implements OnInit, AfterViewInit {
  readonly content = input.required<EChartsOption>();
  readonly data = input<any>();
  readonly style = input<any>();
  readonly echarts = viewChild('echarts', { read: ElementRef });
  private chart: any;

  private theme = signal<object>({});
  private screenService = inject(ScreenService);
  private configService = inject(ConfigService);
  private doc = inject(DOCUMENT);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.theme.set(
      Object.assign(
        {
          color: this.readPalette(),
        },
        this.data()?.theme
      )
    );
  }

  ngAfterViewInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.chart = echarts.init(this.echarts()!.nativeElement, this.theme());
      this.applyOption(this.content());
      // Re-apply the palette when the user switches theme: switchChange$ emits
      // before the new theme class lands on <html>, so defer one tick before
      // reading the refreshed --mat-sys-* values.
      this.configService.switchChange$
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => setTimeout(() => this.applyTheme()));
    }
  }

  onChange(chart: any): void {
    const content = this.content();
    if (isArray(content.series)) {
      content.series.forEach((item: any) => {
        item.type = chart.value;
      });
      this.applyOption(content);
    }
  }

  private applyOption(option: EChartsOption): void {
    this.normalizeAxes(option);
    this.chart?.setOption(option);
  }

  // ECharts has two related failure modes for misconfigured axes:
  //   1. cartesian series (bar/line/scatter/candlestick) without axes → "yAxis 0 not found"
  //   2. non-cartesian series (pie/funnel/gauge/...) carrying leftover cartesian axes —
  //      especially `yAxis: []` — which still bootstraps a Grid component and then
  //      fails the same lookup. Fix both: backfill defaults for cartesian charts,
  //      strip stale axes for everything else.
  private normalizeAxes(option: EChartsOption): void {
    const series = option.series;
    if (!isArray(series)) {
      return;
    }
    const CARTESIAN_TYPES = new Set(['bar', 'line', 'scatter', 'candlestick']);
    const hasCartesian = series.some((s: any) => s && CARTESIAN_TYPES.has(s.type));

    if (hasCartesian) {
      if (!option.xAxis || (isArray(option.xAxis) && option.xAxis.length === 0)) {
        option.xAxis = { type: 'category' };
      }
      if (!option.yAxis || (isArray(option.yAxis) && option.yAxis.length === 0)) {
        option.yAxis = { type: 'value' };
      }
      return;
    }

    if (option.xAxis !== undefined) {
      delete (option as any).xAxis;
    }
    if (option.yAxis !== undefined) {
      delete (option as any).yAxis;
    }
  }

  private applyTheme(): void {
    if (!this.chart) {
      return;
    }
    // Custom palette from the input still wins over the system tokens.
    if (this.data()?.theme?.color) {
      return;
    }
    this.chart.setOption({ color: this.readPalette() });
  }

  private readPalette(): string[] {
    if (!this.screenService.isPlatformBrowser()) {
      return FALLBACK_PALETTE;
    }
    const style = getComputedStyle(this.doc.documentElement);
    const palette = SYS_PALETTE_VARS.map(v =>
      style.getPropertyValue(v).trim()
    ).filter(Boolean);
    return palette.length >= 2 ? palette : FALLBACK_PALETTE;
  }
}
