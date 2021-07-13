import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/uiux/base/base.widget';

@Component({
  selector: 'app-banner-simple',
  templateUrl: './banner-simple.component.html',
  styleUrls: ['./banner-simple.component.scss'],
})
export class BannerSimpleComponent extends BaseComponent implements OnInit {
  @Input() content: any;
  constructor() {
    super();
  }

  ngOnInit(): void {}
}
