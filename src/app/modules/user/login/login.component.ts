import {
  Component,
  OnInit,
  Inject,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ScreenState } from '@core/state/screen/ScreenState';
import { TagsService } from '@core/service/tags.service';
import { UserService } from '@core/service/user.service';
import { ScreenService } from '@core/service/screen.service';
import { CORE_CONFIG, USER } from '@core/token/token-providers';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import type { IUser } from '@core/interface/IUser';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  hide = true;
  loading: boolean;
  error: string;
  userForm: FormGroup;
  phoneForm: FormGroup;
  currentUser: IUser;

  config: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public screenState: ScreenState,
    private tagsService: TagsService,
    public userService: UserService,
    private screenService: ScreenService,
    private cd: ChangeDetectorRef,
    @Inject(CORE_CONFIG) public coreConfig: ICoreConfig,
    @Inject(USER) public user: IUser
  ) {
    if (this.screenService.isPlatformBrowser()) {
      this.userService.userSub$.subscribe((currentUser: any) => {
        // login
        if (currentUser) {
          this.currentUser = currentUser;
          this.cd.detectChanges();
          setTimeout(() => {
            window.location.href =
              this.route.snapshot.queryParams.returnUrl ||
              this.coreConfig.login.loginRedirect;
          }, 2000);
        }
        // logout
        if (!currentUser) {
          this.currentUser.authenticated = false;
          this.cd.detectChanges();
        }
      });
    }
  }

  ngOnInit(): void {
    this.tagsService.setTitle('欢迎登录！');
    this.currentUser = this.user;
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      pass: ['', Validators.required],
    });

    this.phoneForm = this.fb.group({
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern('1(3|4|5|7|8)\\d{9}'),
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
      .subscribe((state) => {
        this.onLogin(state, '登录出现问题，请联系管理员！');
      });
  }

  loginByPhone(): void {
    this.loading = true;
    this.userService
      .loginByPhone(this.phoneForm.value.phone, this.phoneForm.value.code)
      .subscribe((state) => {
        this.onLogin(state, '请检查手机号或者验证码！');
      });
  }

  onLogin(state: any, errorMessage: string): void {
    if (state) {
      this.loading = false;
      this.cd.detectChanges();
    }
    if (!state) {
      this.loading = false;
      this.error = errorMessage;
      this.cd.detectChanges();
    }
  }

  getCode(event: any): any {
    event.preventDefault();
    if (!this.phoneForm.value.phone) {
      this.error = '请输入手机号码';
      this.cd.detectChanges();
      return false;
    }
    this.userService.getCode(this.phoneForm.value.phone).subscribe(() => {
      this.config = {
        leftTime: 60,
        format: 'ss',
      };
      this.cd.detectChanges();
    });
  }
}
