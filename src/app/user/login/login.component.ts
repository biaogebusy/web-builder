import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserState } from '../../mobx/user/UserState';
import { ApiService } from '../../service/api.service';
import { ScreenState } from '../../mobx/screen/ScreenState';
import { AppState } from '../../mobx/AppState';
import { BrandingState } from '../../mobx/BrandingStare';
import { gsap } from 'gsap';
import { TagsService } from 'src/app/service/tags.service';
import { UserService } from 'src/app/service/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, AfterViewInit {
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
    public userService: UserService
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

    this.userState.user$.subscribe((user) => {
      if (user.authenticated) {
        setTimeout(() => {
          this.router.navigate([this.appState.config.login.loginRedirect]);
        }, 2000);
      }
    });
  }

  ngAfterViewInit(): void {
    const t0 = gsap.timeline();
    t0.to('.overlay', { duration: 0.5, opacity: 1 })
      .to('.overlay', {
        duration: 0.5,
        width: '0%',
      })
      .to('.form-scroll', { duration: 0.5, top: 0, ease: 'expo.out' });
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
}
