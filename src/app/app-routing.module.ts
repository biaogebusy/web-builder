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
    loadChildren: () =>
      import('./node/node-routing.module').then((m) => m.NodeRoutingModule),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./page-render/page-routing.module').then(
        (m) => m.PageRoutingModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
