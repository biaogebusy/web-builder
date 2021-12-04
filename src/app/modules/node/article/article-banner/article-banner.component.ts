import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-article-banner',
  templateUrl: './article-banner.component.html',
  styleUrls: ['./article-banner.component.scss'],
})
export class ArticleBannerComponent implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}
}
