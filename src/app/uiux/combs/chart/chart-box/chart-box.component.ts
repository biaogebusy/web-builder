import { ChangeDetectionStrategy, Component, Input, OnInit, inject, signal } from '@angular/core';
import { NodeService } from '@core/service/node.service';
import { ScreenService } from '@core/service/screen.service';
import { defaultsDeep, random } from 'lodash-es';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-chart-box',
  templateUrl: './chart-box.component.html',
  styleUrls: ['./chart-box.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartBoxComponent implements OnInit {
  @Input() content: any;
  @Input() style = {
    minHeight: '50px',
    width: '100%',
  };
  public showChart = signal(false);
  public data$: Observable<any>;
  private nodeService = inject(NodeService);
  private screenService = inject(ScreenService);

  ngOnInit(): void {
    if (this.content?.params?.api) {
      // get chart data
      this.getContent();
    } else {
      this.data$ = of(this.content);
    }

    if (this.screenService.isPlatformBrowser()) {
      this.showChart.set(true);
    }
  }

  getContent(): void {
    const api = this.content.params.api;
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
          this.content
        );
        return data;
      })
    );
  }
}
