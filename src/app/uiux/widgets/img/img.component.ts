import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnInit,
} from '@angular/core';
import { IImg } from '@core/interface/widgets/IImg';
import { AppState } from '@core/mobx/AppState';
import { ScreenState } from '@core/mobx/screen/ScreenState';
import { ScreenService } from '@core/service/screen.service';

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
    public appState: AppState,
    public screen: ScreenState,
    private screenService: ScreenService
  ) {}

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      if (this.content.hostClasses) {
        this.hostClasses = this.content.hostClasses;
      }
    }
  }
}
