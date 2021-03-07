import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserState } from '../../mobx/user/UserState';
import { ApiService } from '../../service/api.service';
import { ScreenState } from '../../mobx/screen/ScreenState';
import { TitleService } from '../../service/title.service';
import { AppState } from '../../mobx/AppState';
import { BrandingState } from '../../mobx/BrandingStare';
import { GsapService } from '../../service/gsap.service';
import { gsap } from 'gsap/all';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  hide = true;
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public userState: UserState,
    private router: Router,
    private apiService: ApiService,
    public screenState: ScreenState,
    private titleService: TitleService,
    private appState: AppState,
    public branding: BrandingState,
    public gsapService: GsapService
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('欢迎登录！');
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      pass: ['', Validators.required],
    });

    this.userState.user$.subscribe((user) => {
      if (user.authenticated) {
        setTimeout(() => {
          this.router.navigate([this.appState.config.loginRedirect]);
        }, 2000);
      }
    });
  }

  ngAfterViewInit(): void {
    const t0 = gsap.timeline();
    t0.to('.overlay', { duration: 0.5, opacity: 1 })
      .to('.overlay', {
        duration: 1,
        width: '0%',
      })
      .to('.form-scroll', { duration: 1.5, top: 0, ease: 'expo.out' });
  }

  get f() {
    return this.userForm.controls;
  }

  login(): void {
    if (this.userForm.invalid) {
      return;
    }

    this.userState.login(
      this.userForm.value.name,
      this.userForm.value.pass,
      this.apiService.localUserKey
    );
    this.userState.user$.subscribe((user) => {
      const t1 = gsap.timeline();
      t1.to('.mark-bg', {
        duration: 3,
        width: '100%',
        ease: 'power3.out',
      }).to('.login-container', { duration: 2, opacity: 0 });
    });
  }
}
