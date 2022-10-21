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
import { PAGE_CONTENT } from '@core/token/token-providers';
import type { IPage } from '@core/interface/IAppConfig';
import { Observable } from 'rxjs';
import type { IHero2v3 } from '@core/interface/combs/IHero';

@Component({
  selector: 'app-hero2v3',
  templateUrl: './hero2v3.component.html',
  styleUrls: ['./hero2v3.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero2v3Component extends BaseComponent implements OnInit {
  @Input() content: IHero2v3;
  showGtXs: boolean;
  constructor(
    public screen: ScreenState,
    private screenService: ScreenService,
    private cd: ChangeDetectorRef,
    @Inject(PAGE_CONTENT) public pageContent$: Observable<IPage>
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
