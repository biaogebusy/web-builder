import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LoginCallbackComponent } from './login-callback/login-callback.component';
import { UserComponent } from './user.component';

export const routes: Routes = [
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
