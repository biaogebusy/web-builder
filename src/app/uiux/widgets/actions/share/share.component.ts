import { Component, OnInit, Input } from '@angular/core';
import { AppState } from '@core/mobx/AppState';
import { ScreenService } from '@core/service/screen.service';
declare var window: any;

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss'],
})
export class ShareComponent implements OnInit {
  @Input() content: any;
  config: any;
  url: string;

  constructor(
    public appState: AppState,
    private screenService: ScreenService
  ) {}

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.config = this.appState.actions?.share;
      this.url = `${this.appState.origin}${this.content.params.url}`;
    }
  }

  open(): void {
    window.socialShare('.share-components');
  }
}
