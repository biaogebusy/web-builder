import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserState } from '../../mobx/user/UserState';
import { ApiService } from '../../service/api.service';
import { ScreenState } from '../../mobx/screen/ScreenState';
import { AppState } from '../../mobx/AppState';
import { BrandingState } from '../../mobx/BrandingStare';
import { gsap } from 'gsap';
import { TagsService } from 'src/app/service/tags.service';
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
    private tagsService: TagsService,
    public appState: AppState,
    public branding: BrandingState
  ) {}

  ngOnInit(): void {
    this.tagsService.setTitle('欢迎登录！');
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      pass: ['', Validators.required],
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

  get f() {
    return this.userForm.controls;
  }

  login(): void {
    if (this.userForm.invalid) {
      return;
    }

    this.userState.login(this.userForm.value.name, this.userForm.value.pass);
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
