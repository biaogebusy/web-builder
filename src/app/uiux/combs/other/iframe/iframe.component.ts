import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Injector,
  effect,
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
  private user = inject(USER);
  private pageContent = inject(PAGE_CONTENT);

  readonly content = input.required<IIframe>();
  public url = signal('');
  public loading = signal(false);
  private screenService = inject(ScreenService);
  private destroyRef = inject(DestroyRef);
  private injector = inject(Injector);

  constructor() {}

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
      const u = this.user();
      if (u && typeof u === 'object' && u.current_user?.uid) {
        this.url.set(content.url.replace(':id', u.current_user.uid));
      }
    }

    if (content?.url.includes(':nid')) {
      effect(() => {
        const page = this.pageContent();
        if (page && typeof page === 'object') {
          const nid = page.config?.node?.nid;
          if (nid) {
            // node 的详情页
            this.url.set(this.content().url.replace(':nid', nid));
          } else {
            // 非node详情页，例如日历页面
            this.url.set('/go-to-node');
          }
        }
      }, { injector: this.injector });
    }
  }
}
