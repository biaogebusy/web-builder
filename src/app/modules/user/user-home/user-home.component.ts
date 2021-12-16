import { Component, OnInit } from '@angular/core';
import { ScreenService } from '@core/service/screen.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss'],
})
export class UserHomeComponent implements OnInit {
  content: any[] = [];
  constructor(private screenService: ScreenService) {}

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.getContent();
    }
  }

  getContent(): void {
    this.content[0] = {
      label: '',
      type: 'text',
      spacer: 'none',
      body: '<p>暂无简介</p>',
    };
  }
}
