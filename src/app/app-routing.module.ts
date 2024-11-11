import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
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
      import('./modules/user/user.module').then(m => m.UserModule),
  },
  {
    path: 'builder',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/builder/builder.module').then(m => m.BuilderModule),
  },
  {
    path: 'en/builder',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/builder/builder.module').then(m => m.BuilderModule),
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
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
