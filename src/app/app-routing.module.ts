import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { ManageGuard } from '@core/guards/manage.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./modules/user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'manage',
    canActivate: [ManageGuard],
    loadChildren: () =>
      import('./modules/manage/manage.module').then((m) => m.ManageModule),
  },
  {
    path: 'sample',
    loadChildren: () =>
      import('./modules/sample/sample.module').then((m) => m.SampleModule),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./modules/page-render/page-render.module').then(
        (m) => m.PageRenderModule
      ),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      initialNavigation: 'enabled',
      preloadingStrategy: PreloadAllModules,
      anchorScrolling: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
