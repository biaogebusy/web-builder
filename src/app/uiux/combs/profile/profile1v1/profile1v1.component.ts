import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import { IImg } from '@core/interface/widgets/IImg';
import { CORE_CONFIG } from '@core/token/core.config';
import { ICoreConfig } from '@core/mobx/IAppConfig';

@Component({
  selector: 'app-profile1v1',
  templateUrl: './profile1v1.component.html',
  styleUrls: ['./profile1v1.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Profile1v1Component implements OnInit {
  @Input() content: any;
  avatar: IImg;
  constructor(@Inject(CORE_CONFIG) private coreConfig: ICoreConfig) {}

  ngOnInit(): void {
    if (!this.content?.avatar?.src) {
      this.avatar = {
        src: this.coreConfig.defaultAvatar,
        alt: 'default avatar',
      };
    } else {
      this.avatar = this.content.avatar;
    }
  }
}
