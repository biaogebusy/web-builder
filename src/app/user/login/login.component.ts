import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserState } from '../../mobx/user/UserState';
import { ApiService } from '../../service/api.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  hide = true;
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public userState: UserState,
    private router: Router,
    private apiService: ApiService
  ) {

  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      pass: ['', Validators.required]
    });

    this.userState.user$.subscribe(user => {
      console.log(user)
      if (user.authenticated) {
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 2000);
      }
    });
  }

  get f() {
    return this.userForm.controls;
  }

  login() {
    console.log(this.userForm.value);
    if (this.userForm.invalid) {
      return;
    }

    this.userState.login(this.userForm.value.name, this.userForm.value.pass, this.apiService.localUserKey);
  }

  ngOnDestroy() {
    this.userState.user$.unsubscribe();
  }

}
