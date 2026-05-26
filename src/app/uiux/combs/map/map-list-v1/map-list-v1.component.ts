import { Component, inject, OnInit, ChangeDetectionStrategy, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import type { IMapListv1 } from '@core/interface/combs/IMap';
import type { IMark } from '@core/interface/IAmap';
import { AmapService } from '@core/service/amap.service';
import { SpinnerComponent } from '@uiux/widgets/spinner/spinner.component';
import { TitleComponent } from '@uiux/widgets/title/title.component';
import { Card1v3Component } from '@uiux/widgets/card/card1v3/card1v3.component';
import { DynamicComponentComponent } from '@uiux/widgets/builder/dynamic-component/dynamic-component.component';
import { SpacerComponent } from '@uiux/widgets/spacer/spacer.component';
import { MapComponent } from '../map/map.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-map-list-v1',
  templateUrl: './map-list-v1.component.html',
  styleUrls: ['./map-list-v1.component.scss'],
  imports: [
    MatIconModule,
    SpinnerComponent,
    TitleComponent,
    Card1v3Component,
    MapComponent,
    DynamicComponentComponent,
    SpacerComponent,
  ],
})
export class MapListV1Component implements OnInit {
  readonly content = input<IMapListv1>();
  elements: any[];
  loading: boolean;
  selectedId: number;
  private amapService = inject(AmapService);
  constructor() {}

  ngOnInit(): void {
    this.elements = this.content().map.elements.map(item => {
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
