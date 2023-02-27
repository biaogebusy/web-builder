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
import { PAGE_CONTENT, USER } from '@core/token/token-providers';
import { ScreenService } from '@core/service/screen.service';
import { IPage } from '@core/interface/IAppConfig';
import { Observable } from 'rxjs';

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
    @Inject(PAGE_CONTENT) private pageContent$: Observable<IPage>,
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
    if (!this.content?.url.includes(':')) {
      this.url = this.content.url;
      this.cd.detectChanges();
      return;
    }
    if (this.content?.url.includes(':id')) {
      if (this.user) {
        const id = this.user.current_user.uid;
        this.url = this.content.url.replace(':id', id);
        this.cd.detectChanges();
      }
    }

    if (this.content?.url.includes(':nid')) {
      this.pageContent$.subscribe((page) => {
        const nid = page.config?.node.nid;
        if (nid) {
          this.url = this.content.url.replace(':nid', nid);
          this.cd.detectChanges();
        }
      });
    }
  }
}
