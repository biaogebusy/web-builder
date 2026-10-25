import { Routes } from '@angular/router';
import { builderCurrentPageFactory } from '@core/factory/builder-factory';
import { BUILDER_CURRENT_PAGE } from '@core/token/token-providers';

export const routes: Routes = [
  {
    path: '',
    providers: [
      {
        provide: BUILDER_CURRENT_PAGE,
        useFactory: builderCurrentPageFactory,
      },
    ],
    loadComponent: () => import('./preview.component').then(m => m.PreviewComponent),
  },
];
