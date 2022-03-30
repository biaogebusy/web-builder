import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserFavoriteComponent } from './user-favorite/user-favorite.component';
import { UserPayComponent } from './user-pay/user-pay.component';

const routes: Routes = [
  {
    path: '/',
    component: LoginComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: ':id',
    component: UserComponent,
    children: [
      {
        path: '',
        component: UserHomeComponent,
      },
      {
        path: 'favorite',
        component: UserFavoriteComponent,
      },
      {
        path: 'pay',
        component: UserPayComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
