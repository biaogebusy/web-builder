import { Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth.guard';
import { authMatchGuard } from '@core/guards/auth-match.guard';
import { PreviewComponent } from '@modules/builder/preview/preview.component';
import { PageComponent } from '@modules/page/page/page.component';

export const routes: Routes = [
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
    canActivate: [authGuard],
  },
];
