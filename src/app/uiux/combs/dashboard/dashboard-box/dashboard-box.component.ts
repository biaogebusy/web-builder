import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import type { IDashboardBox } from '@core/interface/combs/IDashboard';
import { FormService } from '@core/service/form.service';
import { NodeService } from '@core/service/node.service';
import { BaseComponent } from '@uiux/base/base.widget';
import { defaultsDeep, random } from 'lodash-es';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard-box',
  templateUrl: './dashboard-box.component.html',
  styleUrls: ['./dashboard-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardBoxComponent extends BaseComponent implements OnInit {
  @Input() content: IDashboardBox;
  @Input() form = new FormGroup({});
  @Input() model: any = {};
  widget$: Observable<any>;
  constructor(
    private formService: FormService,
    private nodeService: NodeService
  ) {
    super();
  }

  ngOnInit(): void {
    if (this.content?.params?.api) {
      this.getContent();
    } else {
      this.widget$ = of(this.content.widget);
    }
  }

  onModelChange(value: any): void {
    const options = this.formService.handleRangeDate(value);
    this.getContent(options);
  }

  getContent(options = {}): void {
    const api = this.content.params?.api || '';
    const params = this.getApiParams(options);
    this.widget$ = this.nodeService.search(api, params).pipe(
      catchError(() => {
        return of([
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
        ]);
      }),
      map((res) => {
        const data = defaultsDeep(
          {
            dataset: [
              {
                source: res,
              },
            ],
          },
          this.content.widget
        );
        return data;
      })
    );
  }
}
