import {
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Inject,
} from '@angular/core';
import type { IUser } from '@core/interface/IUser';
import type { IIframe } from '@core/interface/widgets/IWidgets';
import { USER } from '@core/token/token-providers';
import { ScreenService } from '@core/service/screen.service';

@Component({
  selector: 'app-iframe',
  templateUrl: './iframe.component.html',
  styleUrls: ['./iframe.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IframeComponent implements OnInit {
  @Input() content: IIframe;
  url: string;
  loading: boolean;
  constructor(
    @Inject(USER) private user: IUser,
    private cd: ChangeDetectorRef,
    private screenService: ScreenService
  ) {}

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      if (this.content.url.includes('disable_sidebar')) {
        this.loading = true;
        window.addEventListener(
          'message',
          (event) => {
            if (event.data === 'ready') {
              this.loading = false;
              console.log('ready');
              this.cd.detectChanges();
            }

            if (event.data === 'loading') {
              this.loading = true;
              console.log('loading');
              this.cd.detectChanges();
            }
          },
          false
        );
      }
    }
    if (!this.content?.url.includes(':id')) {
      this.url = this.content.url;
      this.cd.detectChanges();
      return;
    }
    if (this.user) {
      const id = this.user.current_user.uid;
      this.url = this.content.url.replace(':id', id);
    }
  }
}
