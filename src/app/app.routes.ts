import { Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth.guard';
import { authMatchGuard } from '@core/guards/auth-match.guard';
import { builderCurrentPageFactory } from '@core/factory/factory';
import { BUILDER_CURRENT_PAGE } from '@core/token/token-providers';
import { PageComponent } from '@modules/page/page/page.component';
import { AUTHENTICATED_IDLE_PRELOAD } from '@core/strategy/selective-preloading.strategy';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'me',
    data: { preload: true },
    loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule),
  },
  {
    path: 'preview',
    providers: [
      {
        provide: BUILDER_CURRENT_PAGE,
        useFactory: builderCurrentPageFactory,
      },
    ],
    loadComponent: () =>
      import('./modules/builder/preview/preview.component').then(m => m.PreviewComponent),
  },
  {
    path: 'builder',
    data: { preload: AUTHENTICATED_IDLE_PRELOAD },
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
    canActivate: [authGuard],
  },
];
