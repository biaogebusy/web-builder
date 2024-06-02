import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { FormService } from '@core/service/form.service';
import { isString, merge } from 'lodash-es';
import { NodeService } from '@core/service/node.service';
import type { IMark } from '@core/interface/IAmap';
import { AmapService } from '@core/service/amap.service';
import { BaseComponent } from '@uiux/base/base.widget';
import type { IViewMap, IViewMapItem } from '@core/interface/combs/IViewMap';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-view-map',
  templateUrl: './view-map.component.html',
  styleUrls: ['./view-map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewMapComponent extends BaseComponent implements OnInit {
  @Input() content: IViewMap;
  lists$: Observable<IViewMapItem[] | any>;
  form = new UntypedFormGroup({
    page: new UntypedFormControl(),
  });
  model: any = {};
  selectedId: number;
  loading: boolean;
  constructor(
    private formService: FormService,
    private nodeService: NodeService,
    private amapService: AmapService,
    private cd: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit(): void {
    if (this.content?.params?.api) {
      this.getContent();
    } else {
      if (this.content.elements) {
        this.lists$ = of(this.content.elements);
        this.cd.detectChanges();
      }
    }
  }

  getContent(options = {}): void {
    const params = this.getApiParams(options);
    const urlApi = this.content.params.api || '';
    this.loading = true;
    this.lists$ = this.nodeService.fetch(urlApi, params).pipe(
      map(({ rows, pager }) => {
        rows.forEach((item: any) => {
          // 文字地址形式
          if (item.address) {
            item.address = item.address.replace(/\s+/g, '').trim();
          }
          // position 数组形式 [108.407058, 22.815584]
          if (item.position && isString(item.position)) {
            item.position = item.position.split(',');
          }

          // 经纬度独立字段则处理到position
          if (item.latitude && item.longitude) {
            item.position = [item.longitude, item.latitude];
          }
        });
        this.loading = false;
        return [...rows];
      })
    );
  }

  onModelChange(value: any): void {
    this.form.get('page')?.patchValue(1, { onlySelf: true, emitEvent: false });
    const mergeValue = merge(value, this.form.getRawValue());
    const options = this.formService.handleRangeDate(mergeValue);
    this.getContent(options);
  }

  clear(): void {
    this.form.reset();
  }

  onCard(item: any, i: number): void {
    this.selectedId = i;
    const obj: IMark = {
      index: i,
      item,
      content: this.amapService.getMarker(item),
      setCenter: true,
    };

    this.amapService.markers$.next(obj);
  }
}
