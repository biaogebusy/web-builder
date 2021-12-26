import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserState } from '@core/mobx/user/UserState';
import { ApiService } from '@core/service/api.service';
import { ScreenState } from '@core/mobx/screen/ScreenState';
import { AppState } from '@core/mobx/AppState';
import { BrandingState } from '@core/mobx/BrandingStare';
import { TagsService } from '@core/service/tags.service';
import { UserService } from '@core/service/user.service';
import { ScreenService } from '@core/service/screen.service';
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
  @ViewChild('cd', { static: false }) private countdown: any;

  config: any;

  constructor(
    private fb: FormBuilder,
    public userState: UserState,
    private router: Router,
    public screenState: ScreenState,
    private tagsService: TagsService,
    public appState: AppState,
    public branding: BrandingState,
    public userService: UserService,
    private screenService: ScreenService
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
            this.router.navigate([this.appState.config.login.loginRedirect]);
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

  ngOnDestroy(): void {
    this.userState.user$.unsubscribe();
  }
}
