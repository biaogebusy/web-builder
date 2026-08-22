import { Component, OnInit, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '@core/service/user.service';
import { ScreenService } from '@core/service/screen.service';
import { CORE_CONFIG } from '@core/token/token-providers';
import type { ICoreConfig } from '@core/interface/IAppConfig';

/** Shown when the callback cannot explain itself; the raw reason stays in the console. */
const AUTH_FAILED_MESSAGE = '登录失败，请重试';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-login-callback',
  templateUrl: './login-callback.component.html',
  styleUrls: ['./login-callback.component.scss'],
  imports: [MatButtonModule, MatIconModule],
})
export class LoginCallbackComponent implements OnInit {
  private coreConfig = inject<ICoreConfig>(CORE_CONFIG);
  private router = inject(Router);
  private userService = inject(UserService);
  private screenService = inject(ScreenService);

  error = signal<string>('');
  /** Where the failed attempt was headed, so a retry lands there instead of the default page. */
  private returnUrl = '';

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
      this.router.navigateByUrl(returnUrl || this.loginRedirect);
    } catch (err: any) {
      console.error('OAuth callback failed:', err);
      this.returnUrl = this.userService.pendingReturnUrl;
      this.error.set(err?.message || AUTH_FAILED_MESSAGE);
    }
  }

  retry(): void {
    // The authorization code in this URL is single-use and already spent, so reloading would fail
    // the same way every time; only a fresh authorize request can recover.
    this.error.set('');
    this.userService
      .startAuthorize({ mode: 'redirect', returnUrl: this.returnUrl || this.loginRedirect })
      .catch(err => {
        console.error('Retry authorize failed:', err);
        this.error.set(AUTH_FAILED_MESSAGE);
      });
  }

  goLogin(): void {
    this.router.navigate(this.userService.userLink);
  }

  private get loginRedirect(): string {
    return this.coreConfig.login?.loginRedirect || '/';
  }
}
