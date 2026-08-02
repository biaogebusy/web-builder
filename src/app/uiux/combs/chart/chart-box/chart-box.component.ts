import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
  signal,
  input,
} from '@angular/core';
import { ContenteditDirective } from '@core/directive/contentedit.directive';
import { NodeService } from '@core/service/node.service';
import { ScreenService } from '@core/service/screen.service';
import { defaultsDeep, random } from 'lodash-es';
import { ChartComponent } from '../chart/chart.component';

@Component({
  selector: 'app-chart-box',
  templateUrl: './chart-box.component.html',
  styleUrls: ['./chart-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ContenteditDirective, ChartComponent],
})
export class ChartBoxComponent implements OnInit {
  readonly content = input.required<any>();
  readonly style = input({
    minHeight: '50px',
    width: '100%',
  });
  public showChart = signal(false);
  private nodeService = inject(NodeService);
  private screenService = inject(ScreenService);

  private chartRes = this.nodeService.fetchResource(() => {
    const api = this.content()?.params?.api;
    return api ? { api } : undefined;
  });

  data = computed(() => {
    const content = this.content();
    if (!content?.params?.api) {
      return content;
    }
    const res = this.chartRes.error() ? this.getRandomData() : this.chartRes.value();
    if (!res) {
      return undefined;
    }
    const { count, total } = res;
    return defaultsDeep(
      {
        count,
        total,
        chart: {
          dataset: [
            {
              source: res.chart,
            },
          ],
        },
      },
      content
    );
  });

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.showChart.set(true);
    }
  }

  private getRandomData(): any {
    return {
      total: random(1, 100),
      count: random(1, 100),
      chart: [
        ['name', '用户'],
        ['1月', random(1, 100)],
        ['2月', random(1, 100)],
        ['3月', random(1, 100)],
        ['4月', random(1, 100)],
        ['5月', random(1, 100)],
        ['6月', random(1, 100)],
        ['7月', random(1, 100)],
        ['8月', random(1, 100)],
        ['9月', random(1, 100)],
        ['10月', random(1, 100)],
        ['11月', random(1, 100)],
        ['12月', random(1, 100)],
      ],
    };
  }
}
