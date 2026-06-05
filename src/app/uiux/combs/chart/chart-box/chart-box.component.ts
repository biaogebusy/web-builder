import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject, signal, input } from '@angular/core';
import { ContenteditDirective } from '@core/directive/contentedit.directive';
import { NodeService } from '@core/service/node.service';
import { ScreenService } from '@core/service/screen.service';
import { defaultsDeep, random } from 'lodash-es';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ChartComponent } from '../chart/chart.component';

@Component({
  selector: 'app-chart-box',
  templateUrl: './chart-box.component.html',
  styleUrls: ['./chart-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, ContenteditDirective, ChartComponent],
})
export class ChartBoxComponent implements OnInit {
  readonly content = input.required<any>();
  readonly style = input({
    minHeight: '50px',
    width: '100%',
});
  public showChart = signal(false);
  public data$: Observable<any>;
  private nodeService = inject(NodeService);
  private screenService = inject(ScreenService);

  ngOnInit(): void {
    const content = this.content();
    if (content?.params?.api) {
      // get chart data
      this.getContent();
    } else {
      this.data$ = of(content);
    }

    if (this.screenService.isPlatformBrowser()) {
      this.showChart.set(true);
    }
  }

  getContent(): void {
    const api = this.content().params.api;
    this.data$ = this.nodeService.fetch(api, '').pipe(
      catchError(() => {
        return of({
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
        });
      }),
      map(res => {
        const { count, total } = res;
        const data = defaultsDeep(
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
          this.content()
        );
        return data;
      })
    );
  }
}
