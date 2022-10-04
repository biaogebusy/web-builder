import {
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Inject,
} from '@angular/core';
import { ScreenState } from '@core/mobx/screen/ScreenState';
import { BaseComponent } from '@uiux/base/base.widget';
import { ScreenService } from '@core/service/screen.service';
import { UserState } from '@core/mobx/user/UserState';
import { PAGE_CONTENT } from '@core/token/token-providers';
import { IPage } from '@core/interface/IAppConfig';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-hero2v3',
  templateUrl: './hero2v3.component.html',
  styleUrls: ['./hero2v3.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero2v3Component extends BaseComponent implements OnInit {
  @Input() content: any;
  showGtXs: boolean;
  constructor(
    public screen: ScreenState,
    private screenService: ScreenService,
    private cd: ChangeDetectorRef,
    public userState: UserState,
    @Inject(PAGE_CONTENT) public pageContent$: Observable<IPage>
  ) {
    super(userState);
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
