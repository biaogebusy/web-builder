import { Component, Input, OnInit } from '@angular/core';
import { NgxPackeryOptions } from 'ngx-packery';

@Component({
  selector: 'app-packery',
  templateUrl: './packery.component.html',
  styleUrls: ['./packery.component.scss'],
})
export class PackeryComponent implements OnInit {
  @Input() content: any;

  config: NgxPackeryOptions;
  default: NgxPackeryOptions = {
    gutter: 0,
    imagesLoaded: true,
    percentPosition: true,
  };
  constructor() {}

  ngOnInit(): void {
    this.config = Object.assign({}, this.default, this.content.config);
  }
}
