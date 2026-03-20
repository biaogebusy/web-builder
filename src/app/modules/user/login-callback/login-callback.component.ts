import { Component, OnInit, inject, DestroyRef, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '@core/service/user.service';
import { ScreenService } from '@core/service/screen.service';
import { CORE_CONFIG } from '@core/token/token-providers';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-login-callback',
  template: `
    <div class="callback-container">
      @if (error()) {
        <p class="error">{{ error() }}</p>
      } @else {
        <app-loading />
        <p>正在登录，请稍候...</p>
      }
    </div>
  `,
  styles: [
    `
      .callback-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 300px;
        gap: 16px;
      }
      .error {
        color: var(--mat-sys-error);
      }
    `,
  ],
  standalone: false,
})
export class LoginCallbackComponent implements OnInit {
  private coreConfig = inject<ICoreConfig>(CORE_CONFIG);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private userService = inject(UserService);
  private screenService = inject(ScreenService);
  private destroyRef = inject(DestroyRef);

  error = signal<string>('');

  ngOnInit(): void {
    if (!this.screenService.isPlatformBrowser()) {
      return;
    }

    this.userService.updateUserBySession();

    const timeoutId = setTimeout(() => {
      this.error.set('登录超时，请重试');
    }, 10000);

    this.userService.userSub$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(user => {
        if (user) {
          clearTimeout(timeoutId);
          const { returnUrl = this.coreConfig.login.loginRedirect, ...queryParams } =
            this.route.snapshot.queryParams;
          this.router.navigate([returnUrl], { queryParams });
        }
      });
  }
}
