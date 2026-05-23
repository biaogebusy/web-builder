import { Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '@core/service/user.service';
import { ScreenService } from '@core/service/screen.service';
import { CORE_CONFIG } from '@core/token/token-providers';
import type { ICoreConfig } from '@core/interface/IAppConfig';

@Component({
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

  retry(): void {
    window.location.reload();
  }

  goLogin(): void {
    this.router.navigateByUrl('/user/login');
  }
}
