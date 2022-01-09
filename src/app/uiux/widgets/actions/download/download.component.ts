import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { IDownload } from '@core/interface/widgets/IDownload';
import { AppState } from '@core/mobx/AppState';
import { ScreenService } from '@core/service/screen.service';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DownloadComponent implements OnInit {
  @Input() content: IDownload;
  config: any;
  constructor(
    public appState: AppState,
    private screenService: ScreenService
  ) {}

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.config = this.appState?.actions?.download;
    }
  }
}
