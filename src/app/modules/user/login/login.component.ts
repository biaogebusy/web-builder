import { Component, OnInit, ChangeDetectorRef, OnDestroy, inject, DestroyRef } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TagsService } from '@core/service/tags.service';
import { UserService } from '@core/service/user.service';
import { ScreenService } from '@core/service/screen.service';
import { CORE_CONFIG, USER } from '@core/token/token-providers';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import type { IUser } from '@core/interface/IUser';
import { Observable, Subscription, interval } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false,
})
export class LoginComponent implements OnInit, OnDestroy {
  public coreConfig = inject<ICoreConfig>(CORE_CONFIG);
  public user$ = inject<Observable<IUser>>(USER);

  public hide = true;
  public loading: boolean;
  public error: string;
  public userForm: UntypedFormGroup;
  public phoneForm: UntypedFormGroup;
  public countdown: number;
  private subscription: Subscription;

  private fb = inject(UntypedFormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private tagsService = inject(TagsService);
  private userService = inject(UserService);
  private screenService = inject(ScreenService);
  private cd = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);

  constructor() {
    if (this.screenService.isPlatformBrowser()) {
      this.userService.userSub$.pipe(takeUntilDestroyed()).subscribe((currentUser: any) => {
        // login
        if (currentUser) {
          setTimeout(() => {
            const { returnUrl = this.coreConfig.login.loginRedirect, ...queryParams } =
              this.route.snapshot.queryParams;
            this.router.navigate([returnUrl], { queryParams });
          }, 2000);
        }
      });
    }
  }

  ngOnInit(): void {
    this.tagsService.setTitle('欢迎登录！');
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      pass: ['', Validators.required],
    });

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

  get f(): any {
    return this.userForm.controls;
  }

  get formPhone(): any {
    return this.phoneForm.controls;
  }

  login(): void {
    if (this.userForm.invalid) {
      return;
    }
    this.loading = true;
    this.userService
      .login(this.userForm.value.name, this.userForm.value.pass)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(state => {
        this.onLogin(state, '登录出现问题，请联系管理员！');
      });
  }

  loginByPhone(): void {
    this.loading = true;
    const { phone, code } = this.phoneForm.value;
    this.userService
      .loginByPhone(phone, code)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(state => {
        this.onLogin(state, '请检查手机号或者验证码！');
      });
  }

  onLogin(state: any, errorMessage: string): void {
    if (!state) {
      this.error = errorMessage;
    }
    this.loading = false;
    this.cd.detectChanges();
  }

  getCode(event: any): any {
    event.preventDefault();
    const { phone } = this.phoneForm.value;
    if (!phone) {
      this.error = '请输入手机号码';
      this.cd.detectChanges();
      return false;
    }
    this.userService
      .getCode(phone)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        const { leftTime } = this.coreConfig.login.phoneLogin;
        this.countdown = leftTime;
        const source = interval(1000);
        this.subscription = source.subscribe(val => {
          if (this.countdown > 0) {
            this.countdown--;
          } else {
            this.subscription.unsubscribe();
          }
        });
        this.cd.detectChanges();
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
