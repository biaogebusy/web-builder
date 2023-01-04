import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormService } from '@core/service/form.service';
import { merge } from 'lodash-es';
import { NodeService } from '@core/service/node.service';
import { IMark } from '@core/interface/IAmap';
import { AmapService } from '@core/service/amap.service';
import { BaseComponent } from '@uiux/base/base.widget';

@Component({
  selector: 'app-view-map',
  templateUrl: './view-map.component.html',
  styleUrls: ['./view-map.component.scss'],
})
export class ViewMapComponent extends BaseComponent implements OnInit {
  @Input() content: any;
  lists: any[];
  form = new FormGroup({
    page: new FormControl(),
  });
  model: any = {};
  selectedId: number;
  constructor(
    private formService: FormService,
    private nodeService: NodeService,
    private amapService: AmapService
  ) {
    super();
  }

  ngOnInit(): void {
    if (this.content?.params?.api) {
      this.getContent();
    } else {
      this.lists = this.content.elements;
    }
  }

  getContent(options = {}): void {
    const params = this.getApiParams(options);
    console.log(params);
    this.nodeService
      .search(this.content.params.api, params)
      .subscribe(({ rows, pager }) => {
        rows.forEach((item: any) => {
          item.address = item.address.replace(/\s+/g, '').trim();
        });
        this.lists = rows;
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
      marker: this.getMarker(item),
    };

    this.amapService.markers$.next(obj);
  }

  getMarker(item: any): any {
    return `
    <div class="mark-card p-y-xs p-x-xs">
      <div class="media">
        <img src="${item.img}" />
      </div>
      <div class="media-body m-left-xs">
        <div class="mat-h4 m-bottom-xs text-base">${item.title}</div>
        <div class="mat-h4 m-bottom-xs text-dark title">${item.subTitle}</div>
        <div class="mat-h3 meta m-bottom-0 text-primary">
          <div>${item.meta_1}</div> <div>${item.meta_2}</div>
        </div>
      </div>
      <div class="top arrow"></div>
    </div>
    `;
  }
}
