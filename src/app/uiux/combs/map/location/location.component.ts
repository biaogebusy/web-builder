import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  input
} from '@angular/core';
import type { ILocation } from '@core/interface/combs/IMap';
import { TitleComponent } from '@uiux/widgets/title/title.component';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TitleComponent, MapComponent],
})
export class LocationComponent implements OnInit {
  readonly content = input<ILocation>();

  constructor() {}

  ngOnInit(): void {
    this.content().elements = this.content().elements.map((item: any) => {
      return {
        params: item.company,
      };
    });
  }
}
