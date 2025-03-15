import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import type { ILocation } from '@core/interface/combs/IMap';

@Component({
    selector: 'app-location',
    templateUrl: './location.component.html',
    styleUrls: ['./location.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class LocationComponent implements OnInit {
  @Input() content: ILocation;

  constructor() {}

  ngOnInit(): void {
    this.content.elements = this.content.elements.map((item: any) => {
      return {
        params: item.company,
      };
    });
  }
}
