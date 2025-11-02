import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
  inject,
  DestroyRef,
  signal,
} from '@angular/core';
import type { IUser } from '@core/interface/IUser';
import type { IIframe } from '@core/interface/widgets/IWidgets';
import { PAGE_CONTENT, USER } from '@core/token/token-providers';
import { ScreenService } from '@core/service/screen.service';
import { IPage } from '@core/interface/IAppConfig';
import { Observable, single } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-iframe',
  templateUrl: './iframe.component.html',
  styleUrls: ['./iframe.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class IframeComponent implements OnInit {
  private user$ = inject<Observable<IUser>>(USER);
  private pageContent$ = inject<Observable<IPage>>(PAGE_CONTENT);

  @Input() content: IIframe;
  public url = signal('');
  public loading = signal(false);
  private user: IUser;
  private screenService = inject(ScreenService);
  private destroyRef = inject(DestroyRef);

  constructor() {
    this.user$.pipe(takeUntilDestroyed()).subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      if (this.content.url.includes('disable_sidebar')) {
        this.loading.set(true);
        window.addEventListener(
          'message',
          event => {
            if (event.data === 'ready') {
              this.loading.set(false);
            }

            if (event.data === 'loading') {
              this.loading.set(true);
            }
          },
          false
        );
      }
    }
    if (!this.content?.url.includes('/:')) {
      this.url.set(this.content.url);
      return;
    }
    if (this.content?.url.includes(':id')) {
      if (this.user) {
        const id = this.user.current_user.uid;
        this.url.set(this.content.url.replace(':id', id));
      }
    }

    if (this.content?.url.includes(':nid')) {
      this.pageContent$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(page => {
        const nid = page.config?.node?.nid;
        if (nid) {
          // node 的详情页
          this.url.set(this.content.url.replace(':nid', nid));
        } else {
          // 非node详情页，例如日历页面
          this.url.set('/go-to-node');
        }
      });
    }
  }
}
