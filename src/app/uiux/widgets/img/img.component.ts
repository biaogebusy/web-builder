import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Inject,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import type { IImg } from '@core/interface/widgets/IImg';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import { ScreenService } from '@core/service/screen.service';
import { CORE_CONFIG } from '@core/token/token-providers';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImgComponent implements OnInit {
  @Input() content: IImg | undefined;
  @HostBinding('class') hostClasses: any;
  screenService = inject(ScreenService);

  constructor(@Inject(CORE_CONFIG) public coreConfig: ICoreConfig) {}

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      if (this.content?.hostClasses) {
        this.hostClasses = this.content.hostClasses;
      }
    }
  }
}
