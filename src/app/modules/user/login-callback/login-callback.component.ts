import { Component, OnInit, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  OAUTH_CALLBACK_DENIED,
  OAUTH_CALLBACK_MISSING_PARAMS,
  OAUTH_CALLBACK_NO_SESSION,
  OAUTH_CALLBACK_PROVIDER_ERROR,
  OAUTH_CALLBACK_STATE_MISMATCH,
  UserService,
} from '@core/service/user.service';
import { ScreenService } from '@core/service/screen.service';
import { CORE_CONFIG } from '@core/token/token-providers';
import type { ICoreConfig } from '@core/interface/IAppConfig';

/**
 * Maps the callback's sentinel reasons onto localized copy. A reason outside this map means an
 * unexpected failure — a network error on the token exchange, say — and falls back to the generic
 * message, with the raw reason kept in the console.
 */
const CALLBACK_REASON_KEYS: Record<string, string> = {
  [OAUTH_CALLBACK_DENIED]: 'CALLBACK.ERROR_DENIED',
  [OAUTH_CALLBACK_PROVIDER_ERROR]: 'CALLBACK.ERROR_PROVIDER',
  [OAUTH_CALLBACK_MISSING_PARAMS]: 'CALLBACK.ERROR_INVALID_URL',
  [OAUTH_CALLBACK_NO_SESSION]: 'CALLBACK.ERROR_NO_SESSION',
  [OAUTH_CALLBACK_STATE_MISMATCH]: 'CALLBACK.ERROR_STATE_MISMATCH',
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-login-callback',
  templateUrl: './login-callback.component.html',
  styleUrls: ['./login-callback.component.scss'],
  imports: [MatButtonModule, MatIconModule, TranslateModule],
  host: {
    // Pinned dark on purpose, rather than following the active theme: this screen is laid out for a
    // near-black surface with a faint grid. `mat.theme()` emits nothing but `--mat-sys-*`
    // declarations, so scoping the class to this host recolors the subtree and leaves the rest of
    // the app — and ThemeService's class on <html> — untouched. Palette: theme-config/_dark-colors.
    class: 'dark-theme',
  },
})
export class LoginCallbackComponent implements OnInit {
  private coreConfig = inject<ICoreConfig>(CORE_CONFIG);
  private router = inject(Router);
  private userService = inject(UserService);
  private screenService = inject(ScreenService);
  private translate = inject(TranslateService);

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
      this.error.set(this.localizeReason(err));
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
        this.error.set(this.translate.instant('CALLBACK.ERROR_GENERIC'));
      });
  }

  goLogin(): void {
    this.router.navigate(this.userService.userLink);
  }

  private localizeReason(err: unknown): string {
    const reason = err instanceof Error ? err.message : '';
    const key = CALLBACK_REASON_KEYS[reason];
    return this.translate.instant(key ?? 'CALLBACK.ERROR_GENERIC');
  }

  private get loginRedirect(): string {
    return this.coreConfig.login?.loginRedirect || '/';
  }
}
