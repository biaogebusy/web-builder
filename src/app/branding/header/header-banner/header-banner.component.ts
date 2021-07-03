import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-banner',
  templateUrl: './header-banner.component.html',
  styleUrls: ['./header-banner.component.scss'],
})
export class HeaderBannerComponent implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}
}
