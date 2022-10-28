import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import type { IHeaderTop } from '@core/interface/IBranding';
import { ScreenState } from '@core/state/screen/ScreenState';
import { ScreenService } from '@core/service/screen.service';

@Component({
  selector: 'app-header-top',
  templateUrl: './header-top.component.html',
  styleUrls: ['./header-top.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderTopComponent implements OnInit {
  @Input() content: IHeaderTop | undefined;
  showNoXs: boolean;
  constructor(
    private screen: ScreenState,
    private screenService: ScreenService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.screen.mqAlias$().subscribe((mq) => {
        this.showNoXs = mq.includes('gt-xs');
        this.cd.detectChanges();
      });
    }
  }
}
