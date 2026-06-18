import { Component, OnInit, OnDestroy, inject, DestroyRef, signal, computed, ChangeDetectionStrategy } from '@angular/core';
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
import { TranslateModule } from '@ngx-translate/core';
import { TagsService } from '@core/service/tags.service';
import { UserService } from '@core/service/user.service';
import { ScreenService } from '@core/service/screen.service';
import { API_URL, CORE_CONFIG, USER } from '@core/token/token-providers';
import type { ICoreConfig, ISocialLoginProvider } from '@core/interface/IAppConfig';
import type { IIcon } from '@core/interface/widgets/IIcon';
import type { IUser } from '@core/interface/IUser';
import { IconComponent } from '@uiux/widgets/icon/icon.component';
import { LoadingComponent } from '@uiux/widgets/loading/loading.component';
import { DynamicComponentComponent } from '@uiux/widgets/builder/dynamic-component/dynamic-component.component';
import { Subscription, interval } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
export class LoginComponent implements OnInit, OnDestroy {
  public coreConfig = inject<ICoreConfig>(CORE_CONFIG);
  public user = inject(USER);
  public currentUser = computed(() => {
    const u = this.user();
    return typeof u === 'object' ? u : undefined;
  });
  private apiUrl = inject<string>(API_URL);

  public loading = signal<boolean>(false);
  public error = signal<string>('');
  public phoneForm: UntypedFormGroup;
  public countdown = signal<number>(0);
  private subscription: Subscription;

  private fb = inject(UntypedFormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private tagsService = inject(TagsService);
  private userService = inject(UserService);
  private screenService = inject(ScreenService);
  private destroyRef = inject(DestroyRef);
  private dialogRef = inject(MatDialogRef, { optional: true });

  private get inDialog(): boolean {
    return !!this.dialogRef;
  }

  constructor() {
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
    this.tagsService.setTitle('欢迎登录！');
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
    this.loading.set(true);
    const { returnUrl } = this.route.snapshot.queryParams;
    this.userService
      .startAuthorize({
        mode: this.inDialog ? 'popup' : 'redirect',
        returnUrl,
      })
      .catch(error => {
        console.error('Authorize failed:', error);
        this.showMessage(false, '登录跳转失败，请稍后再试。');
      });
  }

  loginByPhone(): void {
    this.loading.set(true);
    const { phone, code } = this.phoneForm.value;
    this.userService
      .loginByPhone(phone, code)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ ok, message }) => {
        this.showMessage(ok, message || '请检查手机号或者验证码！');
      });
  }

  showMessage(state: any, errorMessage: string): void {
    if (!state) {
      this.error.set(errorMessage);
    }
    this.loading.set(false);
  }

  getCode(event: any): any {
    event.preventDefault();
    const phoneControl = this.phoneForm.controls['phone'];
    if (phoneControl.invalid) {
      phoneControl.markAsTouched();
      this.error.set(phoneControl.hasError('required') ? '请输入手机号码' : '请输入正确的手机号码');
      return false;
    }
    const { phone } = this.phoneForm.value;
    this.userService
      .getCode(phone)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        const { leftTime, delayMessage = '' } = this.coreConfig.login.phoneLogin;
        this.countdown.set(Number(leftTime));
        const source = interval(1000);
        this.subscription = source.subscribe(val => {
          if (this.countdown() > 0) {
            this.countdown.update(value => value - 1);
          } else {
            if (delayMessage) {
              this.showMessage(false, delayMessage);
            }
            this.subscription.unsubscribe();
          }
        });
      });
  }

  socialLogin(provider: ISocialLoginProvider): void {
    if (provider.idp) {
      const { returnUrl } = this.route.snapshot.queryParams;
      this.loading.set(true);
      this.userService
        .startAuthorize({
          mode: this.inDialog ? 'popup' : 'redirect',
          returnUrl,
          idp: provider.idp,
        })
        .catch(error => {
          console.error('Authorize failed:', error);
          this.showMessage(false, '登录跳转失败，请稍后再试。');
        });
      return;
    }
    if (provider.url) {
      window.location.href = `${this.apiUrl}${provider.url}`;
    }
  }

  providerIcon(provider: ISocialLoginProvider): IIcon {
    return provider.svgIcon ? { svg: provider.svgIcon } : { name: provider.icon };
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
