import { Component, inject, Input, OnInit } from '@angular/core';
import type { IMapListv1 } from '@core/interface/combs/IMap';
import type { IMark } from '@core/interface/IAmap';
import { AmapService } from '@core/service/amap.service';

@Component({
    selector: 'app-map-list-v1',
    templateUrl: './map-list-v1.component.html',
    styleUrls: ['./map-list-v1.component.scss'],
    standalone: false
})
export class MapListV1Component implements OnInit {
  @Input() content: IMapListv1;
  elements: any[];
  loading: boolean;
  selectedId: number;
  private amapService = inject(AmapService);
  constructor() {}

  ngOnInit(): void {
    this.elements = this.content.map.elements.map(item => {
      return {
        ...item,
        subTitle: item.address,
      };
    });
  }

  onMap(card: IMark): void {
    const obj: IMark = {
      index: card.index,
      content: this.amapService.getMarker(card.item),
      setCenter: true,
    };
    this.amapService.markers$.next(obj);
  }
}
