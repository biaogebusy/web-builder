import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { ManageGuard } from '@core/guards/manage.guard';
import { BlockComponent } from '@modules/render/block/block.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'me',
    loadChildren: () =>
      import('./modules/user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'super',
    canActivate: [ManageGuard],
    loadChildren: () =>
      import('./modules/manage/manage.module').then((m) => m.ManageModule),
  },
  {
    path: 'builder',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/builder/builder.module').then((m) => m.BuilderModule),
  },
  {
    path: 'en/builder',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/builder/builder.module').then((m) => m.BuilderModule),
  },
  {
    path: '**',
    component: BlockComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
     initialNavigation: 'enabledBlocking',
      preloadingStrategy: PreloadAllModules,
      // enableTracing: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
