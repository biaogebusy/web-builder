import { Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@core/service/user.service';
import { ScreenService } from '@core/service/screen.service';
import { CORE_CONFIG } from '@core/token/token-providers';
import type { ICoreConfig } from '@core/interface/IAppConfig';

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
  private userService = inject(UserService);
  private screenService = inject(ScreenService);

  error = signal<string>('');

  async ngOnInit(): Promise<void> {
    if (!this.screenService.isPlatformBrowser()) {
      return;
    }
    try {
      const { mode, returnUrl } = await this.userService.handleOAuthCallback();
      if (mode === 'popup' && window.opener) {
        window.close();
        return;
      }
      const target = returnUrl || this.coreConfig.login.loginRedirect || '/';
      this.router.navigateByUrl(target);
    } catch (err: any) {
      console.error('OAuth callback failed:', err);
      this.error.set(err?.message || '登录失败，请重试');
    }
  }
}
