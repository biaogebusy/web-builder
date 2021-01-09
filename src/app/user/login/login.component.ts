import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserState } from '../../mobx/user/UserState';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public userState: UserState
  ) {

  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      pass: ['', Validators.required]
    });
  }

  get f() {
    return this.userForm.controls;
  }

  onSubmit() {
    console.log(this.userForm.value);
    if (this.userForm.invalid) {
      return;
    }

    this.userState.login(this.userForm.value.name, this.userForm.value.pass, 'currentUser');
  }

}
