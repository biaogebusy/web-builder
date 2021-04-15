import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './user/login/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    redirectTo: 'lists/jobs',
    pathMatch: 'full',
  },
  {
    path: 'lists',
    loadChildren: './node/node-routing.module#NodeRoutingModule',
  },
  {
    path: '**',
    loadChildren: './page-render/page-routing.module#PageRoutingModule',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
