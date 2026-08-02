import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { ReactiveFormsModule, UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatRippleModule } from '@angular/material/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormService } from '@core/service/form.service';
import { isString, merge } from 'lodash-es';
import { NodeService } from '@core/service/node.service';
import type { IMark } from '@core/interface/IAmap';
import { AmapService } from '@core/service/amap.service';
import { BaseComponent } from '@uiux/base/base.widget';
import type { IViewMap, IViewMapItem } from '@core/interface/combs/IViewMap';
import { FormlyComponent } from '@uiux/combs/form/formly/formly.component';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-view-map',
  templateUrl: './view-map.component.html',
  styleUrls: ['./view-map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatDividerModule,
    MatRippleModule,
    ScrollingModule,
    FormlyComponent,
    MapComponent,
  ],
})
export class ViewMapComponent extends BaseComponent {
  readonly content = input.required<IViewMap>();
  form = new UntypedFormGroup({
    page: new UntypedFormControl(),
  });
  model: any = {};
  selectedId: number;

  formService = inject(FormService);
  nodeService = inject(NodeService);
  amapService = inject(AmapService);

  private queryOptions = signal<any>({});

  private listRes = this.nodeService.fetchResource(() => {
    const api = this.content()?.params?.api;
    if (!api) {
      return undefined;
    }
    return { api, params: this.getApiParams(this.queryOptions()) };
  });

  lists = computed<IViewMapItem[] | any>(() => {
    const content = this.content();
    if (!content?.params?.api) {
      return content.elements ?? [];
    }
    const res = this.listRes.value();
    if (!res) {
      return [];
    }
    return res.rows.map((row: any) => {
      const item = { ...row };
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
      return item;
    });
  });

  constructor() {
    super();
  }

  onModelChange(value: any): void {
    this.form.get('page')?.patchValue(1, { onlySelf: true, emitEvent: false });
    const mergeValue = merge(value, this.form.getRawValue());
    this.queryOptions.set(this.formService.handleRangeDate(mergeValue));
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
