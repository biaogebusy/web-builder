import {
  Component,
  OnInit,
  inject,
  DestroyRef,
  signal,
  computed,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  ReactiveFormsModule,
  UntypedFormGroup,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TagsService } from '@core/service/tags.service';
import {
  OAUTH_POPUP_BLOCKED,
  OAUTH_POPUP_CLOSED,
  OAUTH_POPUP_TIMEOUT,
  UserService,
} from '@core/service/user.service';
import type { OAuthMode, OtpResult } from '@core/service/user.service';
import { ScreenService } from '@core/service/screen.service';
import { API_URL, CORE_CONFIG, USER } from '@core/token/token-providers';
import type { ICoreConfig, ISocialLoginProvider } from '@core/interface/IAppConfig';
import type { IIcon } from '@core/interface/widgets/IIcon';
import { IconComponent } from '@uiux/widgets/icon/icon.component';
import { LoadingComponent } from '@uiux/widgets/loading/loading.component';
import { DynamicComponentComponent } from '@uiux/widgets/builder/dynamic-component/dynamic-component.component';
import { Subscription, interval } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

/**
 * Maps the backend's stable OTP reasons onto localized copy. The codes are the contract — see the
 * `OtpErrorCode` constants in the xinshi_sms module.
 */
const BACKEND_CODE_KEYS: Record<string, string> = {
  phone_required: 'LOGIN.PHONE_REQUIRED',
  phone_invalid: 'LOGIN.PHONE_ERROR',
  phone_not_registered: 'LOGIN.ERROR_NOT_REGISTERED',
  code_incorrect: 'LOGIN.ERROR_CODE_INVALID',
  code_send_throttled: 'LOGIN.ERROR_CODE_THROTTLED',
  code_send_failed: 'LOGIN.ERROR_CODE_SEND_FAILED',
  oauth_failed: 'LOGIN.ERROR_SERVICE',
  server_error: 'LOGIN.ERROR_SERVICE',
};

/**
 * Fallback for backends that predate the `code` field. Matching on English text is brittle — it is
 * kept only so an older deployment still gets localized copy, not as the primary contract.
 */
const BACKEND_MESSAGE_KEYS: Record<string, string> = {
  'incorrect code': 'LOGIN.ERROR_CODE_INVALID',
  'the number is not registered': 'LOGIN.ERROR_NOT_REGISTERED',
  'please enter the phone number': 'LOGIN.PHONE_REQUIRED',
  'please enter the correct phone number': 'LOGIN.PHONE_ERROR',
  'invalid client credentials or oauth2 configuration': 'LOGIN.ERROR_SERVICE',
};

/** Used when `phoneLogin.leftTime` is missing or not a usable number. */
const DEFAULT_RESEND_SECONDS = 60;

/** Mirrors the OTP lifetime hard-coded in the backend (xinshi_sms Otp::validateOtpKey). */
const CODE_VALID_MINUTES = 5;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    TranslateModule,
    IconComponent,
    LoadingComponent,
    DynamicComponentComponent,
  ],
})
export class LoginComponent implements OnInit {
  public coreConfig = inject<ICoreConfig>(CORE_CONFIG);
  public user = inject(USER);
  public currentUser = computed(() => {
    const u = this.user();
    return typeof u === 'object' ? u : undefined;
  });
  private apiUrl = inject<string>(API_URL);

  public loading = signal<boolean>(false);
  public error = signal<string>('');
  /** Neutral confirmation copy, kept apart from `error` so "code sent" never renders as a failure. */
  public notice = signal<string>('');
  public phoneForm: UntypedFormGroup;
  public countdown = signal<number>(0);
  /** Guards the resend button while a request is in flight, since the countdown starts only after. */
  public sendingCode = signal<boolean>(false);
  /** Spells out what the resend button does now; its visible label only carries a bare number. */
  public codeButtonLabel = computed(() => {
    if (this.sendingCode()) {
      return this.translate.instant('LOGIN.CODE_SENDING');
    }
    const seconds = this.countdown();
    if (seconds > 0) {
      return this.translate.instant('LOGIN.CODE_RESEND_IN', { seconds });
    }
    return (
      this.coreConfig.login.phoneLogin?.code?.sendLabel || this.translate.instant('LOGIN.CODE_SEND')
    );
  });
  private countdownSub?: Subscription;
  /** Aborted on destroy, so a popup watcher never outlives the form that opened it. */
  private readonly authAbort = new AbortController();

  private fb = inject(UntypedFormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private tagsService = inject(TagsService);
  private userService = inject(UserService);
  private screenService = inject(ScreenService);
  private translate = inject(TranslateService);
  private destroyRef = inject(DestroyRef);
  private dialogRef = inject(MatDialogRef, { optional: true });

  private get inDialog(): boolean {
    return !!this.dialogRef;
  }

  constructor() {
    this.destroyRef.onDestroy(() => this.authAbort.abort());
    if (this.screenService.isPlatformBrowser()) {
      this.userService.userSub$.pipe(takeUntilDestroyed()).subscribe((currentUser: any) => {
        if (!currentUser) {
          return;
        }
        if (this.inDialog) {
          this.dialogRef?.close(true);
          return;
        }
        setTimeout(() => {
          const { returnUrl = this.coreConfig.login.loginRedirect, ...queryParams } =
            this.route.snapshot.queryParams;
          this.router.navigate([returnUrl], { queryParams });
        }, 2000);
      });
    }
  }

  ngOnInit(): void {
    // Translations are fetched over HTTP, so `instant` would title the page with the raw key on a
    // cold load; `stream` also keeps the title in sync when the language changes.
    this.translate
      .stream('LOGIN.TITLE')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(title => this.tagsService.setTitle(title));
    this.phoneForm = this.fb.group({
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(/^1[3-9]\d{9}$/),
          Validators.minLength(11),
          Validators.maxLength(11),
        ],
      ],
      code: ['', Validators.required],
    });
  }

  get formPhone(): any {
    return this.phoneForm.controls;
  }

  login(): void {
    this.startOAuth();
  }

  socialLogin(provider: ISocialLoginProvider): void {
    if (provider.idp) {
      this.startOAuth(provider.idp);
      return;
    }
    if (provider.url) {
      window.location.href = `${this.apiUrl}${provider.url}`;
    }
  }

  private startOAuth(idp?: string): void {
    this.resetMessages();
    this.loading.set(true);
    const mode: OAuthMode = this.inDialog ? 'popup' : 'redirect';
    const { returnUrl } = this.route.snapshot.queryParams;
    this.userService
      .startAuthorize({
        mode,
        returnUrl,
        signal: this.authAbort.signal,
        ...(idp ? { idp } : {}),
      })
      .catch(error => {
        console.error('Authorize failed:', error);
        this.showMessage(false, this.authorizeErrorMessage(error));
      })
      .finally(() => {
        // Redirect mode is already navigating away — dropping the overlay there would only make
        // the form look idle while the browser leaves the page.
        if (mode === 'popup') {
          this.loading.set(false);
        }
      });
  }

  /** Popup mode reports why it never completed, so the form can explain it and become usable again. */
  private authorizeErrorMessage(error: unknown): string {
    const reason = error instanceof Error ? error.message : '';
    if (reason === OAUTH_POPUP_BLOCKED) {
      return this.translate.instant('LOGIN.ERROR_POPUP_BLOCKED');
    }
    if (reason === OAUTH_POPUP_CLOSED) {
      return this.translate.instant('LOGIN.ERROR_POPUP_CLOSED');
    }
    if (reason === OAUTH_POPUP_TIMEOUT) {
      return this.translate.instant('LOGIN.ERROR_POPUP_TIMEOUT');
    }
    return this.translate.instant('LOGIN.ERROR_AUTHORIZE_FAILED');
  }

  loginByPhone(): void {
    if (this.loading()) {
      return;
    }
    this.resetMessages();
    if (this.phoneForm.invalid) {
      // Pointing at the offending field beats a disabled button that never says what is missing.
      this.phoneForm.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    const { phone, code } = this.phoneForm.value;
    this.userService
      .loginByPhone(phone, code)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(result => {
        this.showMessage(result.ok, this.localizeError(result, 'LOGIN.ERROR_LOGIN_FAILED'));
      });
  }

  showMessage(state: any, errorMessage: string): void {
    if (!state) {
      this.error.set(errorMessage);
    }
    this.loading.set(false);
  }

  getCode(event: Event): void {
    event.preventDefault();
    if (this.sendingCode() || this.countdown() > 0) {
      return;
    }
    this.resetMessages();
    const phoneControl = this.phoneForm.controls['phone'];
    if (phoneControl.invalid) {
      // Surfaced by the field's own mat-error, so the banner stays free of field-level problems.
      phoneControl.markAsTouched();
      return;
    }
    this.sendingCode.set(true);
    const { phone } = this.phoneForm.value;
    this.userService
      .getCode(phone)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(result => {
        this.sendingCode.set(false);
        if (!result.ok) {
          this.error.set(this.localizeError(result, 'LOGIN.ERROR_CODE_SEND_FAILED'));
          return;
        }
        this.notice.set(
          this.translate.instant('LOGIN.CODE_SENT', {
            phone: this.maskPhone(String(phone)),
            minutes: CODE_VALID_MINUTES,
          })
        );
        this.startCountdown();
      });
  }

  private startCountdown(): void {
    this.countdownSub?.unsubscribe();
    const configured = Number(this.coreConfig.login.phoneLogin?.leftTime);
    this.countdown.set(configured > 0 ? configured : DEFAULT_RESEND_SECONDS);
    this.countdownSub = interval(1000)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        if (this.countdown() > 0) {
          this.countdown.update(value => value - 1);
          return;
        }
        this.countdownSub?.unsubscribe();
        const delayMessage = this.coreConfig.login.phoneLogin?.delayMessage;
        if (delayMessage) {
          this.notice.set(delayMessage);
        }
      });
  }

  private resetMessages(): void {
    this.error.set('');
    this.notice.set('');
  }

  private localizeError(result: OtpResult, fallbackKey: string): string {
    const raw = result.message?.trim();
    const key =
      (result.code ? BACKEND_CODE_KEYS[result.code] : undefined) ??
      (result.status === 429 ? 'LOGIN.ERROR_CODE_THROTTLED' : undefined) ??
      (raw ? BACKEND_MESSAGE_KEYS[raw.toLowerCase()] : undefined);
    if (key) {
      return this.translate.instant(key);
    }
    if (raw) {
      // The backend answers in English only, so echoing it would break the localized UI; the raw
      // text stays in the console for debugging.
      console.error('Unmapped backend message:', raw);
    }
    return this.translate.instant(fallbackKey);
  }

  private maskPhone(phone: string): string {
    return phone.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2');
  }

  providerIcon(provider: ISocialLoginProvider): IIcon {
    return provider.svgIcon ? { svg: provider.svgIcon } : { name: provider.icon };
  }
}
