import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import type { IMark } from '@core/interface/IAmap';
import { AmapService } from '@core/service/amap.service';

@Component({
  selector: 'app-map-list-v1',
  templateUrl: './map-list-v1.component.html',
  styleUrls: ['./map-list-v1.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapListV1Component implements OnInit {
  @Input() content: any;
  loading: boolean;
  selectedId: number;
  constructor(private amapService: AmapService) {}

  ngOnInit(): void {}
  onClick(event: IMark): void {
    const obj: IMark = {
      index: event.index,
      marker: this.markerTem(event.item),
    };
    this.amapService.markers$.next(obj);
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
