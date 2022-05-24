import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import { IImg } from '@core/interface/widgets/IImg';
import { ICoreConfig } from '@core/mobx/IAppConfig';
import { ScreenState } from '@core/mobx/screen/ScreenState';
import { ScreenService } from '@core/service/screen.service';
import { CORE_CONFIG } from '@core/token/core.config';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImgComponent implements OnInit {
  @Input() content: IImg;
  @HostBinding('class') hostClasses: any;

  constructor(
    public screen: ScreenState,
    private screenService: ScreenService,
    @Inject(CORE_CONFIG) public coreConfig: ICoreConfig
  ) {}

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      if (this.content.hostClasses) {
        this.hostClasses = this.content.hostClasses;
      }
    }
  }
}
