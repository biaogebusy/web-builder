import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { authMatchGuard } from '@core/guards/auth-match.guard';
import { PreviewComponent } from '@modules/builder/preview/preview.component';
import { PageComponent } from '@modules/page/page/page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'me',
    loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule),
  },
  {
    path: 'preview',
    component: PreviewComponent,
  },
  {
    path: 'builder',
    canMatch: [authMatchGuard],
    loadChildren: () => import('./modules/builder/builder.module').then(m => m.BuilderModule),
  },
  {
    path: 'en/builder',
    canMatch: [authMatchGuard],
    loadChildren: () => import('./modules/builder/builder.module').then(m => m.BuilderModule),
  },
  {
    path: '**',
    component: PageComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      preloadingStrategy: PreloadAllModules,
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
