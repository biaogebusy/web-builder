import {
  Component,
  Input,
  OnInit,
  ViewChild,
  AfterViewInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import type { IPackery } from '@core/interface/combs/IMasonry';
import { NgxPackeryOptions } from 'ngx-packery';

@Component({
  selector: 'app-packery',
  templateUrl: './packery.component.html',
  styleUrls: ['./packery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PackeryComponent implements OnInit, AfterViewInit {
  @Input() content: IPackery;
  @ViewChild('packery') packery: any;
  config: NgxPackeryOptions;
  default: NgxPackeryOptions = {
    gutter: 10,
    imagesLoaded: true,
    percentPosition: true,
    initLayout: false,
  };
  constructor() {}

  ngOnInit(): void {
    this.config = Object.assign({}, this.default, this.content.config);
  }

  ngAfterViewInit(): void {
    this.packery.pckryService.reloadItems();
  }
}
