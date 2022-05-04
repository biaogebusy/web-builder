import { Component, Input, OnInit } from '@angular/core';
import { AMapState } from '@core/mobx/amap/AMapState';
import { IMark } from '@core/interface/IAmap';

@Component({
  selector: 'app-map-list-v1',
  templateUrl: './map-list-v1.component.html',
  styleUrls: ['./map-list-v1.component.scss'],
})
export class MapListV1Component implements OnInit {
  @Input() content: any;
  loading: boolean;
  selectedId: number;
  constructor(private amapState: AMapState) {}

  ngOnInit(): void {}
  onClick(item: any, i: number): void {
    const obj: IMark = {
      index: i,
      marker: this.markerTem(item),
    };
    // this.selected.emit(obj);
    this.selectedId = i;
    this.amapState.markers$.next(obj);
  }

  markerTem(item: any): any {
    return `
      <div class="mark-card p-y-xs p-x-xs">
      <div class="media-body">
        <div class="mat-h4 m-bottom-xs text-base">${item.title}</div>
        <div class="mat-h4 m-bottom-xs text-dark title">${item.params.address}</div>
        <div class="mat-h3 m-bottom-0 text-primary">
        </div>
      </div>
      <div class="top arrow"></div>
    </div>
    `;
  }
}
