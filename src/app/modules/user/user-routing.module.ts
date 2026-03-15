import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LoginCallbackComponent } from './login-callback/login-callback.component';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'login/callback',
    component: LoginCallbackComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
