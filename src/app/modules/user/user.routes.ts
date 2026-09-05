import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LoginCallbackComponent } from './login-callback/login-callback.component';
import { UserComponent } from './user.component';

export const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    data: { titleKey: 'USER.PAGE_TITLE' },
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { titleKey: 'LOGIN.TITLE' },
  },
  {
    path: 'login/callback',
    component: LoginCallbackComponent,
    data: { titleKey: 'LOGIN.CALLBACK_TITLE' },
  },
];
