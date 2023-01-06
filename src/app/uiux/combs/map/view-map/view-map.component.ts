import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormService } from '@core/service/form.service';
import { isString, merge } from 'lodash-es';
import { NodeService } from '@core/service/node.service';
import type { IMark } from '@core/interface/IAmap';
import { AmapService } from '@core/service/amap.service';
import { BaseComponent } from '@uiux/base/base.widget';
import type { IViewMap, IViewMapItem } from '@core/interface/combs/IViewMap';

@Component({
  selector: 'app-view-map',
  templateUrl: './view-map.component.html',
  styleUrls: ['./view-map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewMapComponent extends BaseComponent implements OnInit {
  @Input() content: IViewMap;
  lists: IViewMapItem[];
  form = new FormGroup({
    page: new FormControl(),
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
        this.lists = this.content.elements;
        this.cd.detectChanges();
      }
    }
  }

  getContent(options = {}): void {
    const params = this.getApiParams(options);
    const urlApi = this.content.params.api || '';
    console.log(params);
    this.loading = true;
    this.nodeService.search(urlApi, params).subscribe(({ rows, pager }) => {
      rows.forEach((item: any) => {
        if (item.address) {
          item.address = item.address.replace(/\s+/g, '').trim();
        }
        if (item.position && isString(item.position)) {
          item.position = item.position.split(',');
        }
      });
      this.lists = [...rows];
      this.loading = false;
      this.cd.detectChanges();
    });
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
