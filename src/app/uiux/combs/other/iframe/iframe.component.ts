import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  inject,
  DestroyRef,
  signal,
  input
} from '@angular/core';
import type { IUser } from '@core/interface/IUser';
import type { IIframe } from '@core/interface/widgets/IWidgets';
import { SafeUrlPipe } from '@core/pipe/safe-url.pipe';
import { PAGE_CONTENT, USER } from '@core/token/token-providers';
import { ScreenService } from '@core/service/screen.service';
import { IPage } from '@core/interface/IAppConfig';
import { Observable, single } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LoadingComponent } from '@uiux/widgets/loading/loading.component';

@Component({
  selector: 'app-iframe',
  templateUrl: './iframe.component.html',
  styleUrls: ['./iframe.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SafeUrlPipe, LoadingComponent],
})
export class IframeComponent implements OnInit {
  private user$ = inject<Observable<IUser>>(USER);
  private pageContent$ = inject<Observable<IPage>>(PAGE_CONTENT);

  readonly content = input<IIframe>();
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
    const content = this.content();
    if (this.screenService.isPlatformBrowser()) {
      if (content.url.includes('disable_sidebar')) {
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
    if (!content?.url.includes('/:')) {
      this.url.set(content.url);
      return;
    }
    if (content?.url.includes(':id')) {
      if (this.user) {
        const id = this.user.current_user.uid;
        this.url.set(content.url.replace(':id', id));
      }
    }

    if (content?.url.includes(':nid')) {
      this.pageContent$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(page => {
        const nid = page.config?.node?.nid;
        if (nid) {
          // node 的详情页
          this.url.set(this.content().url.replace(':nid', nid));
        } else {
          // 非node详情页，例如日历页面
          this.url.set('/go-to-node');
        }
      });
    }
  }
}
