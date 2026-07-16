import { importProvidersFrom, signal } from '@angular/core';
import { Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth.guard';
import { authMatchGuard } from '@core/guards/auth-match.guard';
import { AUTHENTICATED_IDLE_PRELOAD } from '@core/strategy/selective-preloading.strategy';
import {
  builderCurrentPageFactory,
  getBuilderConfig,
  pageContentFactory,
} from '@core/factory/factory';
import {
  BUILDER_CONFIG,
  BUILDER_CURRENT_PAGE,
  DEBUG_ANIMATE,
  PAGE_CONTENT,
} from '@core/token/token-providers';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarModule } from '@ngx-loading-bar/core';

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
    canActivate: [authGuard],
    providers: [
      importProvidersFrom(LoadingBarHttpClientModule, LoadingBarModule),
      {
        provide: PAGE_CONTENT,
        useFactory: pageContentFactory,
      },
      {
        provide: BUILDER_CONFIG,
        useFactory: getBuilderConfig,
      },
      {
        provide: BUILDER_CURRENT_PAGE,
        useExisting: PAGE_CONTENT,
      },
      {
        provide: DEBUG_ANIMATE,
        useFactory: () => signal(false),
      },
    ],
    loadComponent: () => import('./modules/page/page/page.component').then(m => m.PageComponent),
  },
];
