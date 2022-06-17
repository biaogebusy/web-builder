import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  Inject,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserState } from '@core/mobx/user/UserState';
import { ScreenState } from '@core/mobx/screen/ScreenState';
import { AppState } from '@core/mobx/AppState';
import { TagsService } from '@core/service/tags.service';
import { UserService } from '@core/service/user.service';
import { ScreenService } from '@core/service/screen.service';
import { CORE_CONFIG } from '@core/token/core.config';
import { ICoreConfig } from '@core/mobx/IAppConfig';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {
  hide = true;
  error: string;
  userForm: FormGroup;
  phoneForm: FormGroup;

  config: any;

  constructor(
    private fb: FormBuilder,
    public userState: UserState,
    private route: ActivatedRoute,
    public screenState: ScreenState,
    private tagsService: TagsService,
    public appState: AppState,
    public userService: UserService,
    private screenService: ScreenService,
    @Inject(CORE_CONFIG) public coreConfig: ICoreConfig
  ) {}

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
          Validators.pattern('1(3|4|5|7|8)\\d{9}'),
          Validators.minLength(11),
          Validators.maxLength(11),
        ],
      ],
      code: ['', Validators.required],
    });
    if (this.screenService.isPlatformBrowser()) {
      this.userState.user$.subscribe((user) => {
        if (user.authenticated) {
          setTimeout(() => {
            window.location.href =
              this.route.snapshot.queryParams.returnUrl ||
              this.coreConfig.login.loginRedirect;
          }, 2000);
        }
      });
    }
  }

  ngAfterViewInit(): void {}

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

    this.userState.login(this.userForm.value.name, this.userForm.value.pass);
  }

  loginByPhone(): void {
    this.userState.loginByPhone(
      this.phoneForm.value.phone,
      this.phoneForm.value.code
    );
  }

  getCode(event: any): any {
    event.preventDefault();
    if (!this.phoneForm.value.phone) {
      this.error = '请输入手机号码';
      return false;
    }
    this.userService.getCode(this.phoneForm.value.phone).subscribe((code) => {
      this.config = {
        leftTime: 60,
        format: 'ss',
      };
    });
  }

  ngOnDestroy(): void {}
}
