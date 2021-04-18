import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner-simple',
  templateUrl: './banner-simple.component.html',
  styleUrls: ['./banner-simple.component.scss'],
})
export class BannerSimpleComponent implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}
}
