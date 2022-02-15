import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { ScreenState } from '@core/mobx/screen/ScreenState';
import { BaseComponent } from '@uiux/base/base.widget';
import { AppState } from '@core/mobx/AppState';
import { ScreenService } from '@core/service/screen.service';

@Component({
  selector: 'app-hero2v3',
  templateUrl: './hero2v3.component.html',
  styleUrls: ['./hero2v3.component.scss'],
})
export class Hero2v3Component extends BaseComponent implements OnInit {
  @Input() content: any;
  showGtXs: boolean;
  constructor(
    public appState: AppState,
    public screen: ScreenState,
    private screenService: ScreenService,
    private cd: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.screen.mqAlias$().subscribe((mq) => {
        this.showGtXs = mq.includes('gt-xs');
        this.cd.detectChanges();
      });
    }
  }
}
